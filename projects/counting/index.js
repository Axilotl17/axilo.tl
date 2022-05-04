const limitInput = document.getElementById("limitInput")
const clipboardStatus = document.getElementById("clipboardStatus")
const startFromInput = document.getElementById("startFromInput")
function setLimit(limit) {
    limitInput.value = limit
}
function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
        clipboardStatus.innerHTML = "Copied to clipboard."
    }, function() {
        clipboardStatus.innerHTML = "Failed to copy to clipboard - try checking your browser preferences on clipboards."
    });
}
function generate(){
    if (limitInput.value == "") {
        limitInput.value = 10000
    }
    if (limitInput.value > 99999) {
        limitInput.value = 99999
    }
    if (startFromInput.value == "") {
        startFromInput.value = 0
    }
    counter = Math.round(document.getElementById("startFromInput").value)
    output = String(counter)
    overload = false
    while (overload == false) {
        counter++
        newOutput = String(output) + "\n" + String(counter)
        if (newOutput.length <= limitInput.value) {
            output = newOutput
        } else {
            overload = true
        }
    }
    document.getElementById("output").innerHTML = output.replaceAll("\n", "<br>")
    updateClipboard(output)
}
function dropdown() {

}