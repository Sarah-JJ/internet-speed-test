const express = require('express');
const router = express.Router();
const multer = require('multer');

const allowedFileSize = require('../modules/get-file-size');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg")
        cb(null, true);
    else
        cb(null, false);
}

const upload = multer({
    storage: storage
    ,
    limits: {fileSize: allowedFileSize},
    fileFilter: fileFilter
})

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index.ejs', {title: 'Internet Speed Test'});
});

router.get('/remove-on-prdct', (req, res, next) => {
    res.render('remove-on-prdct.html', {title: 'remove-on-prdct'});
});

router.post('/', upload.single('image'), (req, res, next) => {
    res.sendStatus(200);
});


module.exports = router;

