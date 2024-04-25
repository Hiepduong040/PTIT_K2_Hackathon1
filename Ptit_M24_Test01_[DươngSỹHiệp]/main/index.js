"use strict";
class Feedback {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}
class FeedbackCoach {
    constructor() {
        this.feedbackList = [];
    }
    renderFeedback(feedback) {
        const listFeedbackContainer = document.getElementById("list-feedback-content");
        if (listFeedbackContainer) {
            const feedbackContent = document.createElement("div");
            feedbackContent.classList.add("feedback-content");
            const feedbackContentHeader = document.createElement("div");
            feedbackContentHeader.classList.add("feedback-content-header");
            const updateIcon = document.createElement("i");
            updateIcon.id = `update_${feedback.id}`;
            updateIcon.classList.add("fa-solid", "fa-pen-to-square");
            const deleteIcon = document.createElement("i");
            deleteIcon.id = `delete_${feedback.id}`;
            deleteIcon.classList.add("fa-solid", "fa-xmark");
            deleteIcon.addEventListener("click", () => {
                this.deleteFeedback(feedback.id);
            });
            feedbackContentHeader.appendChild(updateIcon);
            feedbackContentHeader.appendChild(deleteIcon);
            const feedbackContentBody = document.createElement("div");
            feedbackContentBody.classList.add("feedback-content-body");
            const contentFeedback = document.createElement("p");
            contentFeedback.classList.add("content-feedback");
            contentFeedback.textContent = feedback.name;
            feedbackContentBody.appendChild(contentFeedback);
            const scoreButton = document.createElement("button");
            scoreButton.classList.add("btn-score", "active");
            scoreButton.textContent = feedback.score.toString();
            scoreButton.addEventListener("click", () => {
                this.highlightSelectedScore(feedback.score);
            });
            feedbackContent.appendChild(feedbackContentHeader);
            feedbackContent.appendChild(feedbackContentBody);
            feedbackContent.appendChild(scoreButton);
            listFeedbackContainer.appendChild(feedbackContent);
        }
    }
    deleteFeedback(id) {
        const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
        const updatedFeedbacks = storedFeedbacks.filter((feedback) => feedback.id !== id);
        localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
        const listFeedbackContainer = document.getElementById("list-feedback-content");
        if (listFeedbackContainer) {
            while (listFeedbackContainer.firstChild) {
                listFeedbackContainer.firstChild.remove();
            }
        }
        this.renderFeedbacks();
    }
    highlightSelectedScore(score) {
        const scoreButtons = document.querySelectorAll(".btn-score");
        scoreButtons.forEach((button) => {
            const dataScore = parseInt(button.getAttribute("data-score") || "0");
            if (dataScore === score) {
                button.classList.add("active");
            }
            else {
                button.classList.remove("active");
            }
        });
    }
    renderFeedbacks() {
        const feedbacks = this.getFeedbacksFromLocal();
        feedbacks.forEach((feedback) => {
            this.renderFeedback(feedback);
        });
    }
    saveFeedbackToLocal(feedback) {
        const storedFeedbacks = this.getFeedbacksFromLocal();
        storedFeedbacks.push(feedback);
        localStorage.setItem("feedbacks", JSON.stringify(storedFeedbacks));
    }
    getFeedbacksFromLocal() {
        return JSON.parse(localStorage.getItem("feedbacks") || "[]");
    }
}
function generateUniqueId() {
    return Math.floor(Math.random() * 1000);
}
function score(event) {
    var button = event.target;
    var score = button.getAttribute('data-score');
    // console.log(score); // In điểm số ra console để kiểm tra
    // Thực hiện các xử lý khác dựa trên điểm số
}
function createFeedback() {
    const feedbackInput = document.getElementById("feedbackInput");
    const feedbackContent = feedbackInput.value;
    if (feedbackContent.trim() !== "") {
        const selectedScoreButton = document.querySelector(".btn-score.active");
        const score = parseInt(selectedScoreButton.getAttribute("data-score") || "0");
        const feedback = new Feedback(generateUniqueId(), feedbackContent, score);
        const feedbackCoach = new FeedbackCoach();
        feedbackCoach.renderFeedback(feedback);
        feedbackCoach.saveFeedbackToLocal(feedback);
        feedbackInput.value = "";
    }
}
window.onload = function () {
    const feedbackCoach = new FeedbackCoach();
    feedbackCoach.renderFeedbacks();
    const scoreButtons = document.querySelectorAll(".btn-score");
    scoreButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const score = parseInt(button.getAttribute("data-score") || "0");
            feedbackCoach.highlightSelectedScore(score);
        });
    });
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm === null || feedbackForm === void 0 ? void 0 : feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();
        createFeedback();
    });
};
