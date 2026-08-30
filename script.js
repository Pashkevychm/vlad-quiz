let questions = [
    {
        text: "Що таке інфляція?",
        answers: ["Зростання загального рівня цін", "Зниження вартості всіх товарів"],
        correct: 0
    },
    {
        text: "Яка планета має найбільше супутників у Сонячній системі?",
        answers: ["Юпітер", "Сатурн"],
        correct: 1
    },
    {
        text: "Що вимірює індекс IQ?",
        answers: ["Рівень емоційності людини", "Рівень інтелектуальних здібностей"],
        correct: 1
    },
    {
        text: "Який орган відповідає за вироблення інсуліну?",
        answers: ["Підшлункова залоза", "Печінка"],
        correct: 0
    },
    {
        text: "Що означає термін «геополітика»?",
        answers: ["Вплив географії на міжнародну політику", "Вивчення лише природних ресурсів країни"],
        correct: 0
    },
    {
        text: "Що таке ВВП країни?",
        answers: ["Загальна кількість грошей у країні", "Загальна вартість вироблених товарів і послуг"],
        correct: 1
    },
    {
        text: "Яка частина мозку відповідає переважно за координацію рухів?",
        answers: ["Мозочок", "Гіпоталамус"],
        correct: 0
    },
    {
        text: "Що таке корупція?",
        answers: ["Зловживання владою заради особистої вигоди", "Законне отримання державної винагороди"],
        correct: 0
    },
    {
        text: "Що називають диверсифікацією інвестицій?",
        answers: ["Вкладання всіх коштів в один актив", "Розподіл коштів між різними активами"],
        correct: 1
    },
    {
        text: "Яка країна першою запустила штучний супутник Землі?",
        answers: ["США", "СРСР"],
        correct: 1
    },
]

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const resultScreen = document.querySelector("#result-screen");

const playBtn = startScreen.querySelector(".start-btn")
const replayBtn = resultScreen.querySelector(".start-btn")

const questionElement = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers-container");

let score = 0;
let questionIndex = 0;
let interval;

const timerElement = document.querySelector("#timer")
const scoreElement = document.querySelector("#score-display")
const resultElement = document.querySelector("#result")

function showQuestion(question) {
    let timer = 10;
    timerElement.textContent = `Час: ${timer}`
    interval = setInterval(function() {
        timer -= 1;
        timerElement.textContent = `Час: ${timer}`
        if (timer <=0) {
            clearInterval(interval)
            nextQuestion()
        }
    }, 1000)
    questionElement.textContent = question.text;
    answersContainer.innerHTML = "";
    question.answers.forEach(function(optionText, i) {
        const btn = document.createElement("button");
        btn.textContent = optionText;
        btn.classList.add("answer-btn")
btn.addEventListener("click", function() {
    checkAnswer(btn, i);
})
answersContainer.append(btn)
    })
}



function checkAnswer(selectedBtn, selectedIndex) {
    clearInterval(interval)
    if (selectedIndex == questions[questionIndex].correct) {
        selectedBtn.classList.add("correct")
        score += 1
        scoreElement.textContent = `Бали: ${score}`
        console.log("Правильна відповідь")
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6}
        })
    } else {
        selectedBtn.classList.add("wrong")
        console.log("Неправильна відповідь")
    }
    setTimeout(nextQuestion, 1000)
    const buttons = answersContainer.querySelectorAll(".answer-btn")
    buttons.forEach((btn) => btn.disabled = true)
}



function nextQuestion() {
    questionIndex += 1;
    if (questionIndex < questions.length) {
        showQuestion(questions[questionIndex])
    } else {
        resultElement.textContent = `Набрано балів ${score} з ${questions.length}`
        resultScreen.classList.remove("hide");
        gameScreen.classList.add("hide")
    }
}

function startGame() {
    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
    score = 0;
    scoreElement.textContent = `Бали: ${score}`
    questionIndex = 0;
    showQuestion(questions[questionIndex]);
}

playBtn.addEventListener("click", startGame)
replayBtn.addEventListener("click", startGame)
