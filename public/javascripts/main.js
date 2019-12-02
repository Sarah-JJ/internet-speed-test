let pingRTTElement = document.getElementById("latency");
let downloadSpeedElement = document.getElementById("downloadSpeed");
let uploadSpeedElement = document.getElementById("uploadSpeed");

let speedLoaderElement = document.getElementById("speed-loader");
let connectingLoaderContainerElement = document.getElementById("connecting-loader-container");

let options = {
    // fileUrl: "https://media.wired.com/photos/5c1ae77ae91b067f6d57dec0/master/w_2560%2Cc_limit/Comparison-City-MAIN-ART.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/3069px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    // fileUrl: "../images/3069.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/600px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    fileUrl: "https://images.unsplash.com/photo-1573542625226-956e54f63571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwNDEzMH0?client_id=33e7deece145d5167a15396f3e6bfc0d8447bd6b42cbdc01201c53c20a6b2da6",
    timesToPing: 15,
    timesToDownload: 10,
    timesToUpload: 20
}


// NO CHART SOLUTION
//////////////////////////////////////
window.addEventListener('load', () => {

    if (window.Worker) {
        const myWorker = new Worker("./javascripts/calculate-speed-worker.js");
        myWorker.postMessage(options);
        myWorker.onmessage = function (e) {

            if (e.data.type === "error")
                showErrorPage();
            else if (e.data.type === "latency")
                outputLatencyInstance(e.data)
            else outputSpeedInstance(e.data);

            outputToInternetSpeedElements(e.data);

        }
    } else
        console.log('Your browser doesn\'t support web workers.')

});

function outputLatencyInstance(resultInstance) {
    let type = resultInstance.type;
    let value = resultInstance.value;

    if (resultInstance.isComplete) {
        showProgressBar();
        updateProgressBar(getColor("download"), 0, getTimesToTest("download"))
        speedLoaderElement.innerHTML = `<div class="speed-type">download</div> <div class="speed-value">0</div> <div class="speed-unit">Mbps</div>`;
        console.log(speedLoaderElement.innerHTML)
    }
        speedLoaderElement.classList = type + " m-5";
        connectingLoaderContainerElement.classList = "d-none";
        speedLoaderElement.innerHTML = `<div class="speed-type">${type}</div> <div class="speed-value">${value.latency}</div> <div class="speed-unit">${value.unit}</div>`;
}

function outputSpeedInstance(resultInstance) {

    let type = resultInstance.type;
    let value = resultInstance.value;
    let iteration = resultInstance.iteration;

    updateProgressBar(getColor(type), iteration, getTimesToTest(type));
    speedLoaderElement.classList = type + " m-5";

    speedLoaderElement.innerHTML = `<div class="speed-type">${type}</div> <div class="speed-value">${value.speed}</div> <div class="speed-unit">${value.unit}</div>`;
}

function outputToInternetSpeedElements(resultInstance) {
    if (resultInstance.isComplete) {
        switch (resultInstance.type) {
            case "latency": {
                pingRTTElement.outerHTML = speedLoaderElement.outerHTML;
                break;
            }
            case "download": {
                downloadSpeedElement.outerHTML = speedLoaderElement.outerHTML;
                downloadSpeedElement.classList.remove("d-none");
                break;
            }
            case "upload": {
                uploadSpeedElement.outerHTML = speedLoaderElement.outerHTML;
                uploadSpeedElement.classList.remove("d-none");
                break;
            }
        }
        document.getElementById("internet-speed-elements").classList.remove("f-24");
        document.getElementById("internet-speed-elements").classList.add("f-1rem");
    }
}

function showErrorPage() {
    document.getElementById("loaders").classList.add("d-none");
    document.getElementById("internet-speed-elements").classList.add("d-none");
    document.getElementById("connection-error").classList.remove("d-none");
}

function getTimesToTest(resultInstanceType) {
    if (resultInstanceType === "download")
        return options.timesToDownload;
    else if (resultInstanceType === "upload")
        return options.timesToUpload;
}

function getColor(resultInstanceType) {
    if (resultInstanceType === "download")
        return "#26d0ea"
    else if (resultInstanceType === "upload")
        return "#e398ff";
    else return "#81F8B5";
}