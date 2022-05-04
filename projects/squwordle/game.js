const timeTotal = document.getElementById('timeTotal')

const wordInput = document.getElementById("wordInput")

const redWordsDisplay = document.getElementById("redWords")
const blueWordsDisplay = document.getElementById("blueWords")

const redTimer = document.getElementById("redTimer")
const blueTimer = document.getElementById("blueTimer")

const redPoints = document.getElementById("redPoints")
const bluePoints = document.getElementById("bluePoints")

var vowelList = ["A", "E", "I", "U", "O"]
var letterList = []

var redScore = 0
var blueScore = 0

var redWords = []
var blueWords = []

var gameEnd = false
timeTotal.addEventListener("change", function(e) {
    if (e.target.value != "") {
        document.getElementById(e.target.id + "Label").innerHTML = e.target.value + " seconds"
    } else {
        document.getElementById(e.target.id + "Label").innerHTML = '60 seconds'
    }
})
function generateLetters() {
    letterList = []
    for(var i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
    }
}

function makeLetters(count) {
    vowelCount = 0
    while(vowelCount < 2) {
        vowelCount = 0
        generateLetters()
        for(var i = 0; i < 26 - count; i++) {
            letterList.splice(randNum(0, letterList.length-1), 1)
        }
        for(var i = 0; i < vowelList.length; i++) {
            if(letterList.includes(vowelList[i])) {
                vowelCount++
            }
        }
    }
}

var gameEnd = false
function sleep(milliseconds) { // written by my friend, marc! (not me)
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function updateLabel(ID, text) {
    labelID = ID + "Label"
    document.getElementById(labelID).innerHTML = document.getElementById(ID).value + text
}
function doTurn() { // switches turn flag and turn state between players
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

function endGame() { // when someone runs out of time; determines winner based on larger score; on tie, the player who went second won. also sets win text
    if (redScore > blueScore) {
        document.getElementById("redArrow").style.display = "block"
        document.getElementById("blueArrow").style.display = "none"
        setDisplay("gameObjects", "none")
        document.getElementById("countdown").style.display = "block"
        document.getElementById("countdown").innerHTML = "red won!!!"
        
    } else if (blueScore > redScore) {
        document.getElementById("blueArrow").style.display = "block"
        document.getElementById("redArrow").style.display = "none"
        setDisplay("gameObjects", "none")
        document.getElementById("countdown").style.display = "block"
        document.getElementById("countdown").innerHTML = "blue won!!!"
    } else {
        setDisplay("gameObjects", "none")
        document.getElementById("redArrow").style.display = "none"
        document.getElementById("blueArrow").style.display = "none"
        document.getElementById(defWin +"Arrow").style.display = "none"
        document.getElementById("countdown").style.display = "block"
        document.getElementById("countdown").innerHTML = defWin + " won!!!"
    }
    document.getElementById("retry").style.display = "block"
}
async function playAnim(id, anim) { //plays right/wrong animations 
    element = document.getElementById(id)
    element.style.animation = "none"
    void element.offsetWidth;
    element.style.animation = anim + " 500ms"
}
async function countdown() { // constantly counting down the players timers (alternates per-turn [maintaining 2 countdowns]) and checks until end 
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
            eval(turn + "Points").innerHTML = 999
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
        if (redTimer.innerHTML <= 0 || blueTimer.innerHTML <= 0) {
            gameEnd = true
        }
    }
    endGame()
    return
}
async function game() { // actual game runtime (triggered in HTML document)
    makeLetters(document.getElementById("letterCount").value)
    document.getElementById('setup').style.display = "none";
    for (var i = 3; i != 0; i--) {
        document.getElementById("countdown").innerHTML = i
        await sleep(1000)
    }
    document.getElementById("countdown").innerHTML = "GO!"
    await sleep(500)
    document.getElementById("countdown").innerHTML = ""

    if (document.getElementById("timeTotal").value == "") {
        redTimer.innerHTML = 120
        blueTimer.innerHTML = 120
    } else {
        redTimer.innerHTML = document.getElementById("timeTotal").value
        blueTimer.innerHTML = document.getElementById("timeTotal").value
    }

    if(Math.random() > 0.5){
        turn = "red"
        defWin = "blue"
    } else {
        turn = "blue"
        defWin = "red"
    }

    countdown()

    document.getElementById("retry").style.display = "none"
    document.getElementById(turn+"Arrow").style.display = "block"
    setDisplay("gameObjects", "block")

    document.getElementById("letters").innerHTML = letterList.toString().replaceAll(",", ", ")
    if(gameEnd == true) {
        return
    }
}
wordInput.addEventListener("change", function (e) { // where the words are handled and validated
    evalWord = true
    evalLetters = true
    evalUsed = true
    inputWord = e.target.value
    if (!isWord(inputWord)){
        evalWord = false
    }
    for(var i = 0; i < inputWord.length; i++) {
        if(!letterList.includes(inputWord.charAt(i).toUpperCase())) {
            evalLetters = false
        }
    }
    if(redWords.includes(inputWord) == true || blueWords.includes(inputWord) == true) {
        evalUsed = false
    }
    console.log("word: " + inputWord + "\nisWord: " + evalWord + "\nrightLetters: " + evalLetters + "\nisNotUsed: " + evalUsed)
    if(evalWord == true && evalLetters == true && evalUsed == true) {
        playAnim("wordInput", "right")
        eval(turn + "Words").push(inputWord)
        eval(turn + "WordsDisplay").innerHTML = listToStr(eval(turn + "Words"))
        if (turn == "red") {
            redScore = redScore + inputWord.length + 2
        } else if (turn == "blue") {
            blueScore = blueScore + inputWord.length + 2
        }
        eval(turn + "Points").innerHTML = eval(turn + "Score")
        doTurn()
    } else {
        playAnim("wordInput", "wrong")
    }
    e.target.value = ""
});
timeTotal.addEventListener("change", function(e) {
    if (e.target.value != "") {
        document.getElementById(e.target.id + "Label").innerHTML = e.target.value + " seconds"
    } else {
        document.getElementById(e.target.id + "Label").innerHTML = '60 seconds'
    }
})