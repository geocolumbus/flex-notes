const game = document.getElementsByClassName("game")[0];
const court = document.getElementsByClassName("court")[0];
const puckLeft = document.getElementsByClassName("puck-left")[0];
const puckTop = document.getElementsByClassName("puck-top")[0];
const paddleLeft = document.getElementsByClassName("paddle-top")[0];
const paddleRight = document.getElementsByClassName("paddle-top")[1];
const leftScore = document.getElementsByClassName("left-score")[0];
const rightScore = document.getElementsByClassName("right-score")[0];

let globalWidth = 0;
let globalHeight = 0;

let mainLoop;

function setGameSize() {
    globalWidth = window.innerWidth;
    globalHeight = window.innerHeight - 40;
    game.style.width = `${window.innerWidth}px;`;
    game.style.height = `${window.innerHeight}px`;
}

let xMin = 35;
let yMin = 0;
let xMax;
let yMax;
const stepInterval = 5;
let maxPaddleSpeed = 5;
setInterval(function(){
    maxPaddleSpeed = Math.floor(Math.random()*7+2)
},5000)
let xi = stepInterval;
let yi = stepInterval;

let x = xMin;
let y = yMin;
let paddleLeftY = 0;
let paddleRightY = 0;
let enableLeft = false;
let enableRight = false;

function movePuck() {
    function movePaddle() {
        if (x < globalWidth * 2 / 3) {
            let paddleIntervalLeftY = paddleLeftY - y + 40;
            paddleIntervalLeftY =
                paddleIntervalLeftY > maxPaddleSpeed
                    ? maxPaddleSpeed
                    : paddleIntervalLeftY;
            paddleIntervalLeftY =
                paddleIntervalLeftY < -maxPaddleSpeed
                    ? -maxPaddleSpeed
                    : paddleIntervalLeftY;
            paddleLeftY = paddleLeftY - paddleIntervalLeftY;
            paddleLeft.style.maxHeight = `${paddleLeftY}px`;
        }
        if (x > globalWidth / 3) {
            let paddleIntervalRightY = paddleRightY - y + 40;
            paddleIntervalRightY =
                paddleIntervalRightY > maxPaddleSpeed
                    ? maxPaddleSpeed
                    : paddleIntervalRightY;
            paddleIntervalRightY =
                paddleIntervalRightY < -maxPaddleSpeed
                    ? -maxPaddleSpeed
                    : paddleIntervalRightY;
            paddleRightY = paddleRightY - paddleIntervalRightY;
            paddleRight.style.maxHeight = `${paddleRightY}px`;
        }
    }

    function didHitPaddle(paddleY, y) {
        let closeEnough = paddleY < y && y + 20 < paddleY + 100;
        return closeEnough;
    }

    xMax = globalWidth - 65;
    yMax = globalHeight;
    x += xi;
    y += yi;

    if (x < xMin || x > xMax) {
        xi = -xi;
        if (x < xMin && !didHitPaddle(paddleLeftY, y)) {
            rightScore.innerHTML = parseInt(rightScore.innerHTML) + 1;
            x = xMin;
            y = yMin;
            xi = stepInterval;
        } else if (x > xMax && !didHitPaddle(paddleRightY, y)) {
            leftScore.innerHTML = parseInt(leftScore.innerHTML) + 1;
            x = xMin;
            y = yMin;
            xi = stepInterval;
        }
    }
    yi = y < yMin || y > yMax ? -yi : yi;
    x = x < xMin ? xMin : x;
    x = x > xMax ? xMax : x;
    y = y < yMin ? yMin : y;
    y = y > yMax ? yMax : y;
    puckLeft.style.width = `${x}px`;
    puckTop.style.height = `${y}px`;
    movePaddle();
}

window.addEventListener("resize", setGameSize);
setGameSize();
mainLoop = setInterval(movePuck, 20);
console.log("start1");
