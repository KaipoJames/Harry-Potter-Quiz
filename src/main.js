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
let finalScore;

const app = {

    init() {
        //Display Start Screen
        this.displayStartScreen();

        //initialize variables;
        correct_guesses = 0;
        incorrect_guesses = 0;
        finalScore = 0;

        //Start Quiz
        this.renderQuestion();
        this.addEventListeners();
    },

    displayStartScreen() {
        Start.init();
    },

    getCurrentQuestion() {
        x = questions[currentQuestionIndex];
        return x;
    },

    renderQuestion()
    {
        x = this.getCurrentQuestion();
        question_text.innerHTML = x.question;
        answerA_text.innerHTML = x.answer_A;
        answerB_text.innerHTML = x.answer_B;
        answerC_text.innerHTML = x.answer_C;
        answerD_text.innerHTML = x.answer_D;
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
            this.calculateFinalScore(correct_guesses, incorrect_guesses);
            this.addRetryButton();
        }
    },

    addEventListeners() {
        for (let answer of answers) {
            answer.addEventListener("click", () => {
                selectedAnswer = answer.innerHTML;
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
    calculateFinalScore(correct_guesses, incorrect_guesses) {
        let final_score = 2 * (correct_guesses - (incorrect_guesses/2));
        console.log("Your Score: " + final_score);
    },
    addRetryButton() {
        const retryBtn = document.createElement("h3");
        retryBtn.innerHTML = "Retry";
        result_container.appendChild(retryBtn);

        retryBtn.addEventListener("click", () => {
            location.reload();
        })
    }

}

app.init();
