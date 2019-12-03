let progressValue = document.getElementById("progress-value");
let progressBarLabel = document.getElementById("progress-bar-label");

function showProgressBar() {
    let progressBar = document.getElementById("progress-bar");
    progressBar.classList.remove("d-none");
}

function updateProgressBar(color, currentValue, maximumValue, direction) {
    let width = 0;
    width = Math.round((currentValue / maximumValue) * 100);
    progressValue.style.width = width + "%";
    progressValue.style.background = color;
    // changeProgressBarLabel("Loading")

}

function changeProgressBarColor(color) {
    progressValue.style.background = color;
}

function changeProgressBarLabel(label) {
    progressBarLabel.innerHTML = label;
}