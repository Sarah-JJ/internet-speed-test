// UTILS
var processStatus = function (response) {// process status
    if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error('Error loading: ' + url))
    }
};


var parseBlob = function (response) {
    return response.blob();
};

var parseJson = function (response) {
    return response.json();
};

// download/upload
var downloadFile = function (url) {
    return fetch(url)
        .then(processStatus)
        .then(parseBlob);
};

function uploadImageToImgur(blob) {
    var formData = new FormData();
    formData.append('type', 'file');
    formData.append('image', blob);

    return fetch('/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Client-ID dc708f3823b7756' //imgur specific
        },
        body: formData
    })
        .then(processStatus)
        .then(parseJson);
}

// --- ACTION ---
var sourceImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg/3069px-ESO-The_Omega_Nebula-phot-25a-09-fullres.jpg\n';
console.log('Started downloading image from <a href="' + sourceImageUrl + '">hospodarets.com url</a>');

downloadFile(sourceImageUrl)// download file from one resource
    .then(uploadImageToImgur)// upload it to another
    .then( data => console.log('Image successfully uploaded to <a href="https://imgur.com/' + data.data.id + '">imgur.com url</a>'))
    .catch(function (error) {
        console.error(error.message ? error.message : error);
    });
