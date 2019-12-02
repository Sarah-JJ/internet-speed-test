let options = {
    // fileUrl: "https://media.wired.com/photos/5c1ae77ae91b067f6d57dec0/master/w_2560%2Cc_limit/Comparison-City-MAIN-ART.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/3069px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    // fileUrl: "../images/3069.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/600px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    fileUrl: "https://images.unsplash.com/photo-1573542625226-956e54f63571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwNDEzMH0?client_id=33e7deece145d5167a15396f3e6bfc0d8447bd6b42cbdc01201c53c20a6b2da6",
    timesToPing: 20,
    timesToDownload: 15,
    timesToUpload: 80
}

window.addEventListener('load', () => {

    if (window.Worker) {
        const myWorker = new Worker("./javascripts/calculate-speed-worker.js");
        myWorker.postMessage(options);
        myWorker.onmessage = function (e) {

            if (e.data.type === "error")
                showErrorPage();
            else if (e.data.type === "latency")
                outputLatencyInstance(e.data)
            else {
                outputSpeedInstance(e.data);
                outputToInternetSpeedElements(e.data);
            }
        }
    } else
        showErrorPage();
});