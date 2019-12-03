let pingRTTElement = document.getElementById("latency");
let downloadSpeedElement = document.getElementById("downloadSpeed");
let uploadSpeedElement = document.getElementById("uploadSpeed");

let speedLoaderElement = document.getElementById("speed-loader");
let connectingLoaderContainerElement = document.getElementById("connecting-loading-indicator-container");


function outputLatencyInstance(resultInstance) {
    let type = resultInstance.type;
    let value = resultInstance.value;

    if (resultInstance.isComplete) {
        showProgressBar();
        updateProgressBar(getTestTypeColor("download"), 0, getTimesToTest("download"));
        outputToInternetSpeedElements(resultInstance);
        speedLoaderElement.classList = "download" + " m-5";
        speedLoaderElement.innerHTML = `<div class="speed-type">download</div> <div class="speed-value">0</div> <div class="speed-unit">Mbps</div>`;
    }
    else {
        speedLoaderElement.classList = type + " m-5";
        connectingLoaderContainerElement.classList = "d-none";
        speedLoaderElement.innerHTML = `<div class="speed-type">${type}</div> <div class="speed-value">${value.latency}</div> <div class="speed-unit">${value.unit}</div>`;
    }
}
function outputSpeedInstance(resultInstance) {

    let type = resultInstance.type;
    let value = resultInstance.value;
    let iteration = resultInstance.iteration;

    updateProgressBar(getTestTypeColor(type), iteration, getTimesToTest(type));
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
                // uploadSpeedElement.insertBefore('',  '<img src="/images/upload.png" width="30px" height="30px" class="mr-1" alt="client icon">');
                uploadSpeedElement.classList.remove("d-none");
                changeProgressBarLabel("");
                changeProgressBarColor("#55db5f");
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