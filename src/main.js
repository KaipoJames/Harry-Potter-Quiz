import { questions } from "./questions.js"

//Select DOM Elements
const question_text = document.querySelector("#question");
const answers = document.querySelectorAll(".answer");
const answerA_text = document.querySelector(".answerA");
const answerB_text = document.querySelector(".answerB");
const answerC_text = document.querySelector(".answerC");
const answerD_text = document.querySelector(".answerD");
const result_text = document.querySelector(".result");

let lastQuestionIndex = questions.length - 1;
let currentQuestionIndex = 0;

let selectedAnswer;

const app = {

    init() {
        this.renderQuestion();
        this.addEventListeners();
    },

    renderQuestion()
    {
        let x = questions[currentQuestionIndex];
        question_text.innerHTML = x.question;
        answerA_text.innerHTML = x.answer_A;
        answerB_text.innerHTML = x.answer_B;
        answerC_text.innerHTML = x.answer_C;
        answerD_text.innerHTML = x.answer_D;
        this.showResult(selectedAnswer, x);
    },
    addEventListeners() {
        for (let answer of answers) {
            answer.addEventListener("click", () => {
                selectedAnswer = answer.innerHTML;
                console.log("You Selected: " + selectedAnswer);
            })
        }
    },
    showResult(selectedAnswer, question) {
        const correctAnswer = question.correctAnswer;
        console.log("Selected Answer: " + selectedAnswer);
        console.log("Correct Answer: " + correctAnswer);
        if (selectedAnswer == correctAnswer) {
            result_text.innerHTML = "Correct!";
            
        } else {
            result_text.innerHTML = "Incorrect!";
        }
    }
}

app.init();
