function getTimesToTest(instanceType) {
    if (instanceType === "download")
        return options.timesToDownload;
    else if (instanceType === "upload")
        return options.timesToUpload;
}

function getInstanceTypeColor(instanceType) {
    if (instanceType === "download")
        return "#26d0ea"
    else if (instanceType === "upload")
        return "#e398ff";
}
