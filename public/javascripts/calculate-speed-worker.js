onmessage = function (e) {
    let fileUrl = e.data.fileUrl;
    let uploadFileBlob;

    calculateInternetSpeed().catch((err) => postMessage(err));

    async function calculateInternetSpeed() {
        await calculatePingRTT();
        console.log("ping latency complete");
        await calculateDownloadSpeed();
        console.log("downspeed test complete");
        await calculateUploadSpeed();
        console.log("upload test complete")
    }

    async function calculatePingRTT() {
        let pingRTTInstances = [];

        let timesToPing = e.data.timesToPing;

        for (let i = 0; i < timesToPing; i++) {
                console.log("i = " + i);
                let startTime = Date.now();
                await fetch(fileUrl, {method: 'HEAD', cache: 'reload'})
                    .then(() => {
                        let endTime = Date.now();
                        let rtt = endTime - startTime;
                        console.log(rtt);
                        pingRTTInstances.push(rtt);
                        postMessage({type: "latency", value: formatRTT(rtt), isComplete: false});
                    }).catch((error) => {
                        postMessage({type: "error", value: error.message})
                        // console.log('There has been a problem with your fetch operation: ' + error);
                    });
        }
        let sum = pingRTTInstances.reduce((a, b) => a + b);
        let average = sum / pingRTTInstances.length;
        postMessage({type: "latency", value: formatRTT(average), isComplete: true});

        console.log(pingRTTInstances);
        console.log(average);
    }

    async function calculateDownloadSpeed() {
        let downloadSpeedInstances = [];

        let timesToDownload = e.data.timesToDownload;

        for (let i = 0; i < timesToDownload; i++) {
            console.log("i = " + i);
            let startTime = Date.now();
            let endTime;
            let downloadTime;
            await fetch(fileUrl, {cache: 'reload'})
                .then(res => res.blob())
                .then(fileBlob => {
                        endTime = Date.now();
                        downloadTime = (endTime - startTime) / 1000; // in seconds
                        let downloadSpeedInstance = (fileBlob.size * 0.000008) / downloadTime; //convert file size from byte to megabit
                        console.log(downloadSpeedInstance);

                        downloadSpeedInstances.push(downloadSpeedInstance);
                        postMessage({type: "download", value: formatSpeed(downloadSpeedInstance), isComplete: false});
                        uploadFileBlob = fileBlob;
                    }
                )
                .catch((error) => {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                })
        }
        let sum = downloadSpeedInstances.reduce((a, b) => a + b);
        let average = sum / downloadSpeedInstances.length;
        postMessage({type: "download", value: formatSpeed(average), isComplete: true});

        console.log(downloadSpeedInstances);
        console.log(average);
    }

    async function calculateUploadSpeed() {
        let uploadSpeedInstances = [];
        let timesToUpload = e.data.timesToUpload;

        let formData = new FormData();
        // formData.append('type', 'file');
        formData.append('image', uploadFileBlob);

        for (let i = 0; i < timesToUpload; i++) {
            console.log("i = " + i);
            let startTime = Date.now();
            let endTime;
            let uploadTime;
            await fetch('/', {
                method: 'POST',
                body: formData
            }).then(res => res)
                .then((res) => {
                        endTime = Date.now();
                        uploadTime = (endTime - startTime) / 1000; // in seconds
                        console.log(uploadTime + " S");
                        let uploadSpeedInstance = (uploadFileBlob.size * 0.000008) / uploadTime; //convert file size from byte to megabit
                        uploadSpeedInstances.push(uploadSpeedInstance);
                        postMessage({type: "upload", value: formatSpeed(uploadSpeedInstance), isComplete: false});
                    }
                )
                .catch((error) => {
                    postMessage({type: "error", value: error.message});
                });
        }
        let sum = uploadSpeedInstances.reduce((a, b) => a + b);
        let average = sum / uploadSpeedInstances.length;
        postMessage({type: "upload", value: formatSpeed(average), isComplete: true});

        console.log(uploadSpeedInstances);
        console.log(average);
    }
}

function formatSpeed(speedInMbps) {
    if (speedInMbps < 1)
        return {speed: Math.round(speedInMbps * 1000), unit: "kbps"};
    if (speedInMbps <= 999)
        return {speed: Math.round(speedInMbps), unit: "mbps"};
    else return {speed: Math.round(speedInMbps / 1000), unit: "gbps"};
}

function formatRTT(rtt) {
    return {latency: Math.round(rtt), unit: "ms"}
}


function wait(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

