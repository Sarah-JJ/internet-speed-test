function getTimesToTest(resultInstanceType) {
    if (resultInstanceType === "download")
        return options.timesToDownload;
    else if (resultInstanceType === "upload")
        return options.timesToUpload;
}

function getTestTypeColor(resultInstanceType) {
    if (resultInstanceType === "download")
        return "#26d0ea"
    else if (resultInstanceType === "upload")
        return "#e398ff";
}
