const hexValues = ["A", "B","C","D","E","F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const containerDiv = document.getElementById("container");
const buttonListDiv = document.getElementById("button-list")
const scoreBodyDiv = document.getElementById("score-body")
const imageDiv = document.getElementById("result");
let correctStreak = 0;
let hexList = [];

function initializeGame() {
    hexList = generateHex(3);
    setBackground(hexList[Math.floor(Math.random() * 3)]);
    for(value of hexList) {
        let itemBtn = Object.assign(document.createElement("button"), {
            type: "button",
            className: "button",
            id: value,
            onclick:function() {checkValues(this.id)},
            innerText: value,
        });

        buttonListDiv.appendChild(itemBtn);
    }

    let scoreText = Object.assign(document.createElement("H2"), {
        className: "score-text",
        id: "score-text",
        innerText: "Your current guess streak is: " + correctStreak,
    });

    scoreBodyDiv.appendChild(scoreText)
}

function setBackground(value) {
    containerDiv.style.backgroundColor = value;
    containerDiv.value = value
}

function checkValues(value) {
    const scoreTextDiv = document.getElementById("score-text")
    if(containerDiv.value === value) {
        imageDiv.src="green_checkmark.png";
        imageDiv.style.display = "block";
        setTimeout(function() {imageDiv.src = null; imageDiv.style.display = "none"}, 1000);
        correctStreak += 1;
        scoreTextDiv.innerText = "Your current guess streak is: " + correctStreak;
        newRound();
    } else {
        imageDiv.src="red_x.png";
        imageDiv.style.display = "block";
        setTimeout(function() {imageDiv.src = null; imageDiv.style.display = "none"}, 1000);
        correctStreak = 0;
        scoreTextDiv.innerText = "Your current guess streak is: " + correctStreak;
    }
}

function generateHex(amount = 1) {
    let result = [];
    let iteration = 0;

    while(iteration < amount) {
        let value = "#";
        for(let i = 0; i < 6; i++)  {
            value += hexValues[Math.floor(Math.random() * 15)].toString()
        }
        result.push(value);
        iteration++;

    }
    return result;
}

function newRound() {
    hexList = generateHex(3);
    setBackground(hexList[Math.floor(Math.random() * 3)]);
    let index = 0;
    let buttonListChildren = buttonListDiv.getElementsByTagName("button");
    for(let child of buttonListChildren) {
        child.id = hexList[index];
        child.innerText = hexList[index];
        child.onclick = function() {checkValues(this.id)};
        index++;
    }
}

initializeGame();