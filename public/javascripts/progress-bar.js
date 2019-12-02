function showProgressBar() {
    let progressBar = document.getElementById("progress-bar");
    progressBar.classList.remove("d-none");
}

function updateProgressBar(color, iteration, maximumValue) {
    let width = 0;
    let progressValue = document.getElementById("progress-value");
    let progressPercentage = document.getElementById("progress-percentage");

    width = Math.round((iteration / maximumValue) * 100);
    progressValue.style.width = width + "%";
    progressPercentage.innerHTML = width + "%";
    progressValue.style.background = color;

}
