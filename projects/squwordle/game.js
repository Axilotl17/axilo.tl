const timeTotal = document.getElementById('timeTotal')
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
async function game() {
    document.getElementById('setup').style.display = "none";
    for (let i = 3; i != 0; i--) {
        document.getElementById('countdown').innerHTML = i
        await sleep(1000)
    }
    document.getElementById('countdown').innerHTML = "GO!"
    await sleep(500)
    document.getElementById('countdown').innerHTML = ""

}
