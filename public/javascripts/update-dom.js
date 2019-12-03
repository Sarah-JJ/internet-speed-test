let latencyElement = document.getElementById("latency");
let downloadSpeedElement = document.getElementById("download-speed");
let uploadSpeedElement = document.getElementById("upload-speed");

let speedLoaderElement = document.getElementById("speed-loader");
let connectingLoaderContainerElement = document.getElementById("connecting-loading-indicator-container");

let parentContainer = document.getElementById("parent-container");


function outputLatencyInstance(resultInstance) {
    let type = resultInstance.type;
    let value = resultInstance.value;

    if (resultInstance.isComplete) {
        showProgressBar();
        updateProgressBar(getInstanceTypeColor("download"), 0, getTimesToTest("download"));
        outputToInternetSpeedElements(resultInstance);
        speedLoaderElement.classList = "download" + " m-5";
        speedLoaderElement.innerHTML = `<div class="speed-type">download</div> <div class="speed-value">0</div> <div class="speed-unit">Mbps</div>`;
    } else {
        parentContainer.classList.replace("h-100", "h-50");
        speedLoaderElement.classList = type + " m-5";
        connectingLoaderContainerElement.classList = "d-none";
        speedLoaderElement.innerHTML = `<div class="speed-type">${type}</div> <div class="speed-value">${value.latency}</div> <div class="speed-unit">${value.unit}</div>`;
    }
}

function outputSpeedInstance(resultInstance) {

    let type = resultInstance.type;
    let value = resultInstance.value;
    let iteration = resultInstance.iteration;

    updateProgressBar(getInstanceTypeColor(type), iteration, getTimesToTest(type));
    speedLoaderElement.classList = type + " m-5";
    speedLoaderElement.innerHTML = `<div class="speed-type">${type}</div> <div class="speed-value">${value.speed}</div> <div class="speed-unit">${value.unit}</div>`;
}

function outputToInternetSpeedElements(resultInstance) {
    if (resultInstance.isComplete) {
        switch (resultInstance.type) {
            case "latency": {
                latencyElement.innerHTML = constructInternetSpeedElement(resultInstance);
                break;
            }
            case "download": {
                downloadSpeedElement.innerHTML = constructInternetSpeedElement(resultInstance);
                downloadSpeedElement.classList.remove("d-none");
                break;
            }
            case "upload": {
                uploadSpeedElement.innerHTML = constructInternetSpeedElement(resultInstance);
                // uploadSpeedElement.insertBefore('',  '<img src="/images/upload.png" width="30px" height="30px" class="mr-1" alt="client icon">');
                uploadSpeedElement.classList.remove("d-none");
                changeProgressBarLabel("");
                changeProgressBarColor("#52c067");
                break;
            }
        }
        document.getElementById("internet-speed-elements").classList.remove("f-24");
        document.getElementById("internet-speed-elements").classList.add("f-1rem");
    }
}


function constructInternetSpeedElement(resultInstance) {
    let type = resultInstance.type;
    let value = resultInstance.value;
    let instanceValue = type === "latency" ? value.latency : value.speed;

    let typeElement = `<div class="speed-type">${type}</div>`
    let image = `<img src="/images/${type}.png" class="mr-1 flex-wrap" alt="client icon" width="22px" height="22px">`
    let speedValue = `<div class="speed-value">${instanceValue}</div>`
    let speedUnit = `<div class="speed-unit">${value.unit}</div>`;

    return typeElement + image + speedValue + speedUnit;
}

function showErrorPage() {
    document.getElementById("loaders").classList.add("d-none");
    document.getElementById("internet-speed-elements").classList.add("d-none");
    document.getElementById("connection-error").classList.remove("d-none");
}