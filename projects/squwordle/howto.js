var letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g"
]
function  isInputWord() {
    demoInput = document.getElementById("demoInput");
    demoLabel = document.getElementById("demoLabel");
    demoInput.addEventListener("change", function () {
        rightLetters = true
        if (isWord(demoInput.value)) {
            for (let i = 0; i < demoInput.value.length; i++) {
                if (letters.includes(demoInput.value.charAt(i)) === false) {
                    rightLetters = false
                }   
            }
            if (rightLetters) {
                demoLabel.innerHTML = "Congrats, that word works!"
                demoLabel.style.color = "green"
            } else {
                demoLabel.innerHTML = "Uh oh, you can't use some of those letters!"
                demoLabel.style.color = "red"
            }
        } else {
            demoLabel.innerHTML = "Not a real word!"
            demoLabel.style.color = "red"
        }
    });
}