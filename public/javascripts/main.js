let options = {
    fileUrl: "../images/image.jpg",
    timesToPing: 15,
    timesToDownload: 8,
    timesToUpload: 5
}

window.addEventListener('load', () => {

    if (window.Worker) {
        const myWorker = new Worker("./javascripts/calculate-speed-worker.js");
        myWorker.postMessage(options);
        myWorker.onmessage = function (e) {

            if (e.data.type === "error")
                showErrorPage();
            else if (e.data.type === "ping")
                outputLatencyInstance(e.data)
            else {
                outputSpeedInstance(e.data);
                outputToInternetSpeedElements(e.data);
            }
        }
    } else
        showErrorPage();
});