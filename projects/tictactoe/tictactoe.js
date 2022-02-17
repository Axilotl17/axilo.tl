const naught = "./tictactoe/o.png"
const cross = "./tictactoe/x.png"
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
