let pingRTTElement = document.getElementById("latency");
let downloadSpeedElement = document.getElementById("downloadSpeed");
let uploadSpeedElement = document.getElementById("uploadSpeed");

let speedLoaderElement = document.getElementById("speed-loader");
let connectingLoaderContainerElement = document.getElementById("connecting-loader-container");

let horizontalRulerElement = document.getElementById("horizontal-ruler");

let options = {
    // fileUrl: "https://media.wired.com/photos/5c1ae77ae91b067f6d57dec0/master/w_2560%2Cc_limit/Comparison-City-MAIN-ART.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/3069px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    // fileUrl: "../images/3069.jpg",
    fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/600px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    // fileUrl: "https://images.unsplash.com/photo-1573542625226-956e54f63571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwNDEzMH0?client_id=33e7deece145d5167a15396f3e6bfc0d8447bd6b42cbdc01201c53c20a6b2da6",
    timesToPing: 1,
    timesToDownload: 1,
    timesToUpload: 10
}


// NO CHART SOLUTION
//////////////////////////////////////
window.addEventListener('load', () => {

    if (window.Worker) {
        const myWorker = new Worker("./javascripts/calculate-speed-worker.js");
        myWorker.postMessage(options);
        myWorker.onmessage = function (e) {

            if (e.data.type === "error") {
                console.log(e.data.value);
                showErrorPage();
            }

            outputToSpeedLoaderElement(e.data);
            outputToInternetSpeedElements(e.data);
        }
    } else
        console.log('Your browser doesn\'t support web workers.')

});

function outputToSpeedLoaderElement(resultInstance) {

    speedLoaderElement.classList = resultInstance.type + " m-5";
    connectingLoaderContainerElement.classList = "d-none";

    console.log(resultInstance)

    if (resultInstance.type === "latency")
        speedLoaderElement.innerHTML = `<div class="speed-type">${resultInstance.type}</div> <div class="speed-value">${resultInstance.value.latency}</div> <div class="speed-unit">${resultInstance.value.unit}</div>`;
    else
        speedLoaderElement.innerHTML = `<div class="speed-type">${resultInstance.type}</div> <div class="speed-value">${resultInstance.value.speed}</div> <div class="speed-unit">${resultInstance.value.unit}</div>`;
}

function outputToInternetSpeedElements(resultInstance) {
    if (resultInstance.isComplete)
        switch (resultInstance.type) {
            case "latency": {
                pingRTTElement.outerHTML = speedLoaderElement.outerHTML;
                horizontalRulerElement.classList.remove("d-none");
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
}

function showErrorPage() {
    document.getElementById("app").classList = "d-none";
    let alertContent = document.createTextNode("Something went wrong. Check your internet connection, and try again later.");
    let alert = document.createElement("div");
    alert.appendChild(alertContent);
    alert.classList = "alert alert-warning";
    alert.role = "alert";
    document.querySelector('body').appendChild(alert);
}