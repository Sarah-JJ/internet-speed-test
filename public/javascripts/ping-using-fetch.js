let timesToPing = 5;
let pingRTTInstances = [];
let pingRTTElement = document.getElementById("pingRTTElement");
let url = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/3069px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg";
let i = 0;


window.addEventListener('load', () => {
    calculatePingRTT(function(average){
        pingRTTElement.innerHTML = "downlink speed: " + average.toFixed(0);
    });
});

function calculatePingRTT(outputResult) {
    let startTime = Date.now();
    if (i < timesToPing) {
        i++;
        fetch(url + '?cache_breaker=' + startTime, {
            method: 'HEAD'
        })
            .then((res) => {
                let endTime = Date.now();
                let pingRTTInstance = (endTime - startTime);
                pingRTTInstances.push(pingRTTInstance);
                pingRTTElement.innerHTML = "downlink speed: " + pingRTTInstance.toFixed(0);

                calculatePingRTT(outputResult);
            }).catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }
    else {
        let sum = pingRTTInstances.reduce((a, b) => (a + b));
        let average = sum / pingRTTInstances.length;
        console.log(pingRTTInstances);
        console.log(average);
        outputResult(average);
    }
}