import { questions } from "./questions.js";
import { Start } from "./start.js"

//Select DOM Elements
const question_text = document.querySelector("#question");
const answers = document.querySelectorAll(".answer");
const answerA_text = document.querySelector(".answerA");
const answerB_text = document.querySelector(".answerB");
const answerC_text = document.querySelector(".answerC");
const answerD_text = document.querySelector(".answerD");

const result_container = document.querySelector(".result-container");
const result_text = document.querySelector(".result");
const result_img = document.querySelector(".result-img");

let lastQuestionIndex = questions.length - 1;
let currentQuestionIndex = 0;

let x;
let selectedAnswer;
let correct_guesses;
let incorrect_guesses;
let final_score;

var start_timer;
var end_timer;

export const app = {

    init() {
        //Display Start Screen
        this.displayStartScreen();
    },

    //Start Quiz is Implemenented in start.js
    startQuiz() {
        //initialize variables;
        correct_guesses = 0;
        incorrect_guesses = 0;
        final_score = 0;

        //Start the Timer
        start_timer = performance.now();

        //Display First Question
        this.renderQuestion();
        this.addEventListeners();
    },

    // <-- APP HELPER METHODS -->

    displayStartScreen() {
        Start.init();
    },

    // Helper methods to render questions
    getCurrentQuestion() {
        x = questions[currentQuestionIndex];
        return x;
    },
    renderQuestion()
    {
        x = this.getCurrentQuestion();
        question_text.innerHTML = "Question " + x.id + ") " + x.question;
        answerA_text.innerHTML = "A) " + x.answer_A;
        answerB_text.innerHTML = "B) " + x.answer_B;
        answerC_text.innerHTML = "C) " + x.answer_C;
        answerD_text.innerHTML = "D) " + x.answer_D;
    },
    renderNextQuestion() {
        if (currentQuestionIndex != lastQuestionIndex) {
            currentQuestionIndex ++;
            this.renderQuestion();
        } else {
            // Handle End Of Test
            console.log("Test Completed! Standby for results.");
            console.log("Correct Answers: " + correct_guesses);
            console.log("Incorrect Answers: " + incorrect_guesses);

            let time = this.calculateQuizTime();

            this.calculateFinalScore(correct_guesses, incorrect_guesses, time);
            this.addRetryButton();
        }
    },
    addEventListeners() {
        for (let answer of answers) {
            answer.addEventListener("click", () => {
                selectedAnswer = answer.innerHTML.slice(3);
                x = this.getCurrentQuestion();
                this.showResult(selectedAnswer, x);
            })
        }
    },
    getCorrectAnswer(question) {
        if (question.correct_answer == "A") {
            return question.answer_A;
        } else if (question.correct_answer == "B") {
            return question.answer_B;
        } else if (question.correct_answer == "C") {
            return question.answer_C;
        } else {
            return question.answer_D
        }
    },
    showResult(selectedAnswer, question) {
        const correctAnswer = this.getCorrectAnswer(question); 
        if (selectedAnswer == correctAnswer) {
            result_text.innerHTML = "Correct!";
            result_img.src = "../icons/correct.png";
            correct_guesses++;
            this.renderNextQuestion();
            
        } else {
            result_text.innerHTML = "Incorrect!";
            result_img.src = "../icons/incorrect.png";
            incorrect_guesses++;
        }
    },

    // Helper methods to handle post quiz
    calculateFinalScore(correct_guesses, incorrect_guesses, time) {
        final_score = 20 * (correct_guesses - (incorrect_guesses/2));
        if (correct_guesses >= incorrect_guesses) {
            console.log("You qualify for a time bonus!");
            this.addTimeBonus(time);
        }
        console.log("Your Score: " + final_score);
    },
    addTimeBonus(time) {
        let bonus = 0;
        if (time <= 59) {
            bonus = 100;
        } else if (time >= 60 && time <= 79) {
            bonus = 75;
        } else {
            bonus = 50;
        }
        console.log("+ " + bonus + " points!");
        final_score += bonus;
    },
    addRetryButton() {
        const retryBtn = document.createElement("h3");
        retryBtn.innerHTML = "Retry";
        result_container.appendChild(retryBtn);

        retryBtn.addEventListener("click", () => {
            location.reload();
        })
    },
    calculateQuizTime() {
        end_timer = performance.now();
        let completion_time = ((end_timer - start_timer) / 1000).toFixed(1);
        console.log("You Completed The Quiz in " + completion_time + " seconds.");
        return completion_time;
    }
    

}

// Initialize application
app.init();
