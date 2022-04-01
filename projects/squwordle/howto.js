var letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g"
]
async function playAnim(id, anim) {
    element = document.getElementById(id)
    element.style.animation = "none"
    void element.offsetWidth;
    element.style.animation = anim + " 500ms"
}
function isInputWord() {
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
                playAnim("demoInput", "right")
            } else {
                demoLabel.innerHTML = "Uh oh, you can't use some of those letters!"
                demoLabel.style.color = "red"
                playAnim("demoInput", "wrong")
            }
        } else {
            demoLabel.innerHTML = "Not a real word!"
            demoLabel.style.color = "red"
            playAnim("demoInput", "wrong")
        }
    });
}