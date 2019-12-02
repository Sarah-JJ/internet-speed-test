let progressValue = document.getElementById("progress-value");
let progressPercentage = document.getElementById("progress-bar-label");

function showProgressBar() {
    let progressBar = document.getElementById("progress-bar");
    progressBar.classList.remove("d-none");
}

function updateProgressBar(color, currentValue, maximumValue) {
    let width = 0;
    width = Math.round((currentValue / maximumValue) * 100);
    progressValue.style.width = width + "%";
    progressValue.style.background = color;
    changeProgressBarLabel("Loading")

}

function changeProgressBarColor(color) {
    progressValue.style.background = color;
}

function changeProgressBarLabel(label) {
    progressPercentage.innerHTML = label;
}