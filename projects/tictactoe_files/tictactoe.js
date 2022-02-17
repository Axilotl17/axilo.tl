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
    [1, 3, 6],
    [2, 4, 8],
    [4, 5, 9],
    [1, 4, 9],
    [3, 4, 9],


]

function boxClick(index) {
    img = document.getElementById("img" + index)
    if (boxStatuses[index] == "") {
        if (turn == "x") {
            img.src = cross
            turn = "o"
            boxStatuses[index] = "x"
        } else {
            img.src = naught
            turn = "x"
            boxStatuses[index] = "o"
        }
    }  
}
