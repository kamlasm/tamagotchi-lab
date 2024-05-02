/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let state = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0
}

let timer;

let gameOver;

/*------------------------ Cached Element References ------------------------*/
const boredomStatEl = document.querySelector("#boredom-stat")
const hungerStatEl = document.querySelector("#hunger-stat")
const sleepinessStatEl = document.querySelector("#sleepiness-stat")

const gameButtons = document.querySelectorAll(".button-wrapper > button")

const gameMessageEl = document.querySelector("#message")
const resetBtnEl = document.querySelector("#restart")

/*-------------------------------- Functions --------------------------------*/
function init() {
    gameMessageEl.classList.add("hidden")
    resetBtnEl.classList.add("hidden") 
    
    Object.keys(state).forEach((item) => {
        state[item] = 0
    }) 
    boredomStatEl.textContent = state.boredom
    hungerStatEl.textContent = state.hunger
    sleepinessStatEl.textContent = state.sleepiness

    gameOver = false;

    timer = setInterval(runGame, 2000)
}

init()

function runGame() {
    updateStates()
    checkGameOver()
    render()
}

function updateStates() {  
    Object.keys(state).forEach((item) => {
        state[item] += Math.floor(Math.random() * 4)
    }) 
}

function checkGameOver() {
    if (Object.keys(state).some((item) => {
        return state[item] >= 10
    }) ) {
        gameOver = true;
    }
}

function render() {
    boredomStatEl.textContent = state.boredom
    hungerStatEl.textContent = state.hunger
    sleepinessStatEl.textContent = state.sleepiness

    if (gameOver) {
        clearInterval(timer)
        gameMessageEl.classList.remove("hidden")
        resetBtnEl.classList.remove("hidden")
    }
}

function handleClick(event) {
    
    if (event.target.id === "play") {
        state.boredom = 0
    } else if (event.target.id === "feed") {
        state.hunger = 0
    } else if (event.target.id === "sleep") {
        state.sleepiness = 0
    }
    render()
}

/*----------------------------- Event Listeners -----------------------------*/
gameButtons.forEach((button) => {
    button.addEventListener("click", handleClick)
})

resetBtnEl.addEventListener("click", init)