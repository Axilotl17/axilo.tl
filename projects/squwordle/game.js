const timeTotal = document.getElementById('timeTotal')
var letterList = []
var vowelList = ["A", "E", "I", "U", "O"]
function makeLetters() {
    for(var i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
    }
}

var gameEnd = false
function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function updateLabel(ID, text) {
    labelID = ID + "Label"
    document.getElementById(labelID).innerHTML = document.getElementById(ID).value + text
}
timeTotal.addEventListener("change", function(e) {
    if (e.target.value != "") {
        document.getElementById(e.target.id + "Label").innerHTML = e.target.value + " seconds"
    } else {
        document.getElementById(e.target.id + "Label").innerHTML = '60 seconds'
    }
})
function doTurn() {
    if (turn == "red") {
        turn = "blue"
        document.getElementById("blueArrow").style.display = "block"
        document.getElementById("redArrow").style.display = "none"
    } else {
        turn = "red"
        document.getElementById("redArrow").style.display = "block"
        document.getElementById("blueArrow").style.display = "none"
    }
}
async function countdown() {
    currentCountdown = turn
    penalty = 0
    await sleep(1500)
    while (gameEnd == false) {
        if (currentCountdown != turn) {
            await sleep(1500)
            currentCountdown = turn
            penalty = 0
        }
        if (redTimer.innerHTML == "0" || redTimer.innerHTML == "0") {
            gameEnd = true
            return
        }
        if(penalty > 30) {
            if (turn == "red" && currentCountdown == "red") {
                bluePoints.innerHTML = 999
            } else if (turn == "blue" && currentCountdown == "blue") {
                redPoints.innerHTML = 999
            }  
            gameEnd = true
        } else if (penalty > 20) {
            if (turn == "red" && currentCountdown == "red") {
                redPoints.innerHTML--
            } else if (turn == "blue" && currentCountdown == "blue") {
                bluePoints.innerHTML--
            }  
        }
        penalty++
        if (turn == "red" && currentCountdown == "red") {
            redTimer.innerHTML--
            await sleep(1000)
        } else if (turn == "blue" && currentCountdown == "blue") {
            blueTimer.innerHTML--
            await sleep(1000)
        }  
    }
    return
}

const redTimer = document.getElementById("redTimer")
const blueTimer = document.getElementById("blueTimer")
const redPoints = document.getElementById("redPoints")
const bluePoints = document.getElementById("bluePoints")

var redWords = []
var blueWords = []
const redWordsDisplay = document.getElementById("redWords")
const WordsDisplay = document.getElementById("blueWords")

function listToStr(listInput) {
    let x = listInput.toString().replaceAll(",", "<br>"); return x
}
function setDisplay(className, Value) {
    var objects = document.getElementsByClassName(className);
    for (var i=0; i < objects.length; i++) {
        objects[i].style.display = Value;
    }
}
function randNum(min, max) {
    let x = Math.floor((max-min+1) * Math.random() + min); return x 
}
function generateLetters() {
    makeLetters()
    for(var i = 0; i < 26 - maxLetters; i++) {
        letterList.splice(randNum(0, letterList.length-1), 1)
    }
}
async function playAnim(id, anim) {
    element = document.getElementById(id)
    element.style.animation = "none"
    void element.offsetWidth;
    element.style.animation = anim + " 500ms"
}
async function game() {
    document.getElementById('setup').style.display = "none";
    for (var i = 3; i != 0; i--) {
        document.getElementById('countdown').innerHTML = i
        await sleep(1000)
    }
    document.getElementById('countdown').innerHTML = "GO!"
    await sleep(500)
    document.getElementById('countdown').innerHTML = ""
    if (document.getElementById("timeTotal").value == "") {
        redTimer.innerHTML = 120
        blueTimer.innerHTML = 120
    } else {
        redTimer.innerHTML = document.getElementById("timeTotal").value
        blueTimer.innerHTML = document.getElementById("timeTotal").value
    }
    if(Math.random() > 0.5){
        turn = "red"
    } else {
        turn = "blue"
    }
    countdown()
    document.getElementById(turn+"Arrow").style.display = "block"
    vowelCount = 0
    letterList = []
    maxLetters = document.getElementById("letterCount").value
    while(vowelCount < 2) {
        vowelCount = 0
        letterList = []
        generateLetters()
        for(var i = 0; i < vowelList.length; i++) {
            if(letterList.includes(vowelList[i])) {
                vowelCount++
            }
        }
    }
    demoInput.addEventListener("change", function (e) {
        e.target.value
    });
    setDisplay("gameObjects", "block")
    document.getElementById("letters").innerHTML = letterList.toString().replaceAll(",", ", ")
}
