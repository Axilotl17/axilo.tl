const timeTotal = document.getElementById('timeTotal')
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
    if(turn == "red") {
        document.getElementById("redArrow").style.display = "block"
        document.getElementById("blueArrow").style.display = "none"
    } else if (turn == "blue") {
        document.getElementById("blueArrow").style.display = "block"
        document.getElementById("redArrow").style.display = "none"
    }
}
async function countdown() {
    currentCountdown = turn
    while (gameEnd == false) {
        if (currentCountdown != turn) {
            await sleep(3000)
        }
        if (turn == "red") {
            
        }
    }
    return
}
async function game() {
    
    document.getElementById('setup').style.display = "none";
    for (let i = 3; i != 0; i--) {
        document.getElementById('countdown').innerHTML = i
        await sleep(1000)
    }
    document.getElementById('countdown').innerHTML = "GO!"
    await sleep(500)
    document.getElementById('countdown').innerHTML = ""
    if (document.getElementById("timeTotal").value == "") {
        document.getElementById("redTimer").innerHTML = 120
        document.getElementById("blueTimer").innerHTML = 120
    } else {
        document.getElementById("redTimer").innerHTML = document.getElementById("timeTotal").value
        document.getElementById("blueTimer").innerHTML = document.getElementById("timeTotal").value
    }
    if(Math.random() > 0.5){
        turn = "red"
    } else {
        turn = "blue"
    }
}
