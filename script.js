const questions = [
    {
        question : "Which is the team that won IPL 2023?",
        answers: [
            {text : "Mumbai Indians", correct: false},
            {text : "Chennai Super Kings", correct: true},
            {text : "Royal Challengers Bangalore", correct: false},
            {text : "Gujarat Titans", correct: false},
        ]
    },
    {
        question : "How many players in a team will actually play on field?",
        answers: [
            {text : "10", correct: false},
            {text : "15", correct: false},
            {text : "11", correct: true},
            {text : "8", correct: false},
        ]
    },
    {
        question : "Which player has the most number of 100s?",
        answers: [
            {text : "Virat Kohli", correct: false},
            {text : "Sachin Tendulkar", correct: true},
            {text : "Ricky Pointing", correct: false},
            {text : "MS Dhoni", correct: false},
        ]
    },
    {
        question : "Which player holds the record for highest score in ODI?",
        answers: [
            {text : "Virat Kohli", correct: false},
            {text : "Sachin Tendulkar", correct: true},
            {text : "Ricky Pointing", correct: false},
            {text : "MS Dhoni", correct: false},
        ]
    },
    {
        question : "What are the three main formats of the game?",
        answers: [
            {text : "ODI, T10, 60overs", correct: false},
            {text : "T10, 30overs, T20", correct: false},
            {text : "Test, ODI, T10", correct: false},
            {text : "ODI, T20, Test", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtnElement = document.getElementById("nextBtn")

let  currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtnElement.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("btn");
        optionsElement.appendChild(button);
        if(option.correct){
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextBtnElement.style.display = "none";
    while(optionsElement.firstChild){
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(optionsElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtnElement.style.display = 'block';
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`;
    nextBtnElement.innerHTML = "Play Again";
    nextBtnElement.style.display = "block";

}
function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtnElement.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz()