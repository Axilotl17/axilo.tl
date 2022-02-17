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
var won = false

function boxClick(index) {
    img = document.getElementById("img" + index)
    if (boxStatuses[index] == "" && won == false) {
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
    wins.forEach(function(element, index) {
        if (element.includes(boxIndex)) {
            if (boxStatuses[element[0]] == boxStatuses[element[1]] && boxStatuses[element[0]] == boxStatuses[element[2]]) {
                console.log(boxStatuses[element[1]] + " won")
                won = true
            }
        }
    })
}