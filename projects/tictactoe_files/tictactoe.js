const naught = "./tictactoe_files/o.png"
const cross = "./tictactoe_files/x.png"
var turn = "x"

var boxStatuses = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
]
const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
var finish = false
const winMsg = document.getElementById("winMsg")
const playAgain = document.getElementById("playAgain")
function boxClick(index) {
    img = document.getElementById("img" + index)
    if (boxStatuses[index] == "" && finish == false) {
        img.style.display='block'
        if (turn == "x") {
            img.src = cross
            turn = "o"
            boxStatuses[index] = "x"
        } else {
            img.src = naught
            turn = "x"
            boxStatuses[index] = "o"
        }
        checkWin(index)
    }  
}
function checkWin(boxIndex) {
    wins.forEach(function(element) {
        if (element.includes(boxIndex)) {
            if (boxStatuses[element[0]] == boxStatuses[element[1]] && boxStatuses[element[0]] == boxStatuses[element[2]]) {
                winMsg.innerHTML = boxStatuses[element[1]].toUpperCase() + " won!"
                finish = true
                winMsg.style.display='block'
                playAgain.style.display='block'
                console.log(boxStatuses[element[1]].toUpperCase() + " won!")
            } else if (!boxStatuses.includes("")) {
                winMsg.innerHTML = "It's a draw!"
                finish = true
                winMsg.style.display='block'
                playAgain.style.display='block'
            }
        }
    })
}
function clearBoard() {
    for (i=0; i<=8; i++) {
        document.getElementById("img"+i).src = ""
        boxStatuses[i] = ""
    }
    finish = false
    winMsg.style.display='none'
    playAgain.style.display='none'
}
