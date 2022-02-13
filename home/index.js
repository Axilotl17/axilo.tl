function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function copy(text) {
    document.getElementById("clipboardStatus").innerHTML = "hi"
    navigator.clipboard.writeText(text).then(function() {
        document.getElementById("clipboardStatus").innerHTML = `Copied ${text} to clipboard.`
    }, function() {
        document.getElementById("clipboardStatus").innerHTML = `Failed to copy ${text} to clipboard.`
    });
    await sleep(5000)
    document.getElementById("clipboardStatus").innerHTML = " "
}
