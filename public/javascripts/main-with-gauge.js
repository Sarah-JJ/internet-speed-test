let pingRTTElement = document.getElementById("pingRTT");
let pingRTTAverageElement = document.getElementById("pingRTTAverage");

let downloadSpeedGauge = Gauge(document.getElementById("downloadSpeedGauge"), {
        max: 150,
        dialStartAngle: 0,
        dialEndAngle: 180,
        value: 0,
        label: function (value) {
            return Math.round(value) + " Mbps";
        }
    }
);

let uploadSpeedGauge = Gauge(document.getElementById("uploadSpeedGauge"), {
        max: 150,
        dialStartAngle: 0,
        dialEndAngle: 180,
        value: 0,
        label: function (value) {
            return Math.round(value) + " Mbps";
        }
    }
);

let options = {
    // fileUrl: "https://media.wired.com/photos/5c1ae77ae91b067f6d57dec0/master/w_2560%2Cc_limit/Comparison-City-MAIN-ART.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/3069px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    fileUrl: "../images/3069.jpg",
    // fileUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/600px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg",
    // fileUrl: "https://images.unsplash.com/photo-1573542625226-956e54f63571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEwNDEzMH0?client_id=33e7deece145d5167a15396f3e6bfc0d8447bd6b42cbdc01201c53c20a6b2da6",
    timesToPing: 10,
    timesToDownload: 20,
    timesToUpload: 3
}

// CHART SOLUTION
////////////////////////////////////
window.addEventListener('load', () => {
    let isDownloadTestComplete;
    let isPingTestComplete;
    if (window.Worker) {
        const myWorker = new Worker("./javascripts/calculate-speed-worker.js");
        myWorker.postMessage(options);
        myWorker.onmessage = function (e) {

            switch (e.data.type) {
                case "rtt":
                    pingRTTElement.innerText = e.data.value + " ms";
                    isPingTestComplete = e.data.isComplete;
                    break;
                case "downloadSpeed": {
                    downloadSpeedGauge.setValueAnimated(getSpeed(e.data.value), 1);
                    isDownloadTestComplete = e.data.isComplete;
                    break;
                }
                case "uploadSpeed":
                    uploadSpeedGauge.setValueAnimated(e.data.value, 1);
                    break;
            }

        }

    } else {
        console.log('Your browser doesn\'t support web workers.')
    }


});

function getSpeed(speedInMbps) {
    if(speedInMbps<1)
        return Math.round(speedInMbps*1024);
    if(speedInMbps<=999)
        return Math.round(speedInMbps);
    else return Math.round(speedInMbps/1024);
}


// NO CHART SOLUTION
////////////////////////////////////////
// window.addEventListener('load', () => {
//
//     if (window.Worker) {
//         const myWorker = new Worker("./javascripts/calculate-speed-worker.js");
//         myWorker.postMessage(options);
//         myWorker.onmessage = function (e) {
//             downloadSpeedElement.innerHTML = "downlink speed: " + e.data.value;
//             console.log('Message received from worker');
//         }
//     } else {
//         console.log('Your browser doesn\'t support web workers.')
//     }
// });
