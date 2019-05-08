const multer = require('multer')
const firebase = require('firebase-admin');
const format = require('util').format;
const express = require('express')
const router = express.Router()

// -------- Multer --------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const storage2 = multer.memoryStorage()

const upload = multer({ storage: storage })
const upload2 = multer({ storage: storage2 })
//-------------------------------------------------------

const serviceAccount = {
    type: "service_account",
    project_id: "senior-project-235617",
    private_key_id: "90b02459c166e44963f0de5853f0e043dd06ea1b",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXDQxuleja+XVk\nYnto9Ym8jMSXIMaisj5A6Kwkvo2T3zJ6lkpQVtPjd3wQnh4V/0MAW1tGWfdsbfcI\nAVlovgp1kcIsq95/Tj/cr6iupCVzxHpnk2jYzR4c3LWdtK6v54ly+9UwmpSCqSFS\nLOZorxsd3MBtxhr/x5cgw0Vl5TmOeOVgLMnM1BWed5AJ2EE84lpSMGAC2Cutpmnk\nc40+4ysGikS3y97fHPJCui82KVl2stmF4aDgU6ZCs2DMQp/2N9uAvLBEYEXfkw/p\nS15hGzHyC7/ksf0+nYMTqFouUAKWBOv0eSJ8s01r55kApH7IBFqVUcC/g1+6N2iU\nQvF5D5fjAgMBAAECggEAD/RdtUCgSh/9d8lKAEijLjQVYQ74na5yqZckL6+xdO83\nYVqQFd4d5z+Amq0DF2eyPVm0b7I8sIncrMveKcQGUPWo6G6HLykLhOBwDSY2ycbM\nZq3MNrV1DqLImJ7Z4klfwazxrU2dR1pWk1sAbHN9TrMHgGgVAwqi6YvYig2Tvmrn\n4V7qlsz48BR8wHxbF/LSLHz9YVnjr/wtfRoF42Mdc3KwF4Cp2shsXBFaHaItureJ\npNybpdiftHa1oPQLwntZUQS0jkePrkIU+8Yo0BOUockaW9gYaI2Ci6XcF6rXRQpx\nx2dPUtR4dYNgJaGQk3X/ym9BdzHxkSwD0WQdp6of+QKBgQD22xGDEtmhdmsmXqir\nzZuOqtz6vwMvaww2K2kTkd7OX5SoL9GEqYF/w6sL9YsLE0/EaIZVLv30ZN4amqZY\nhNG9LwD1NAhY97am1aAaBqwn3+XX45WXjHEK8SmY8Cgvpu7wSm7CV1wFDXszJzJ2\n8pwoqdkHcjrmUUYo5zXEjldwKQKBgQDfBGAwuWwZGhCQQ3u0aax1f+YW4BiR+ylW\nGSfNe+2dwtk9L9xx8wGOo5RNETL1CRWl+QpKe/DP3U1kv9bOtjeliP1mk5+lw/3U\n1ea/8KdkR1KJzhFafbF86LBZPvvjwOY4XJyn1Qpy9LeDpBbxBoJgNnHbqxYd7kcd\nbmHYZYXZKwKBgQCccNbXR1HutnpPVbv1LRdBQd1Ld1QQb/nMNpSf11jpVr+CGtPg\nDABKtPkoWhMlELcDlO5U+7PrdyUenRWAkaPODgTAYJpNr6bscgPFmqbtmkIyIEPE\nSDe3pIAlMUV2dYeFdtZciTqC5TlHgLbFlRkL2B/3TRgwsB8TevujNkYJiQKBgDd6\nUC9uwOxRppMspmZP713fbi58msAd2b+YTGV6kbawFPh6on0aNWX1XVv6jlGUa/U4\nyY2T3WjoJWuNqXMMszUTqe3NhWZoJgm/GELhK9LvRyIOyBRZtkBbZhsdZu3WO68D\notjBT3MfW1N9C1P0CZTDlnlNyxexAbHZlq+NOcm3AoGAbuYANhxYWJqBJErnPR+d\ndx4OZlphwrHqFvcvKboq8bcCoCMfT/68s9fJ9gk7mBbt0tJgi5J9MtcA6aVbqqAA\nZjdTRauajDuzIwwdcxB81Im2SQhC++lvJCk/FwxEzq1qsSeQS3kTj5TQTyCTQMKd\noACgZX2VRLnxnR7ZqpZXlVI=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-k4h41@senior-project-235617.iam.gserviceaccount.com",
    client_id: "112586908241241262790",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k4h41%40senior-project-235617.iam.gserviceaccount.com"
  }
  
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    storageBucket: "senior-project-235617.appspot.com/"
  });
var bucket = firebase.storage().bucket();
const options = {
    prefix: 'Images/',
}
//-------------------------------------------------------
// --------- Router --------------------------------------
router.get("/", (req, res) => {
    res.send("/")
})
router.post("/upload", upload.single('file'), (req, res) => {
    res.send(req.file)
})
router.post("/uploadMulti", upload.array('photos', 5), (req, res) => {
    //console.log(req.body)
    res.send(JSON.stringify(req.files))
})
router.post("/uploadFB", upload2.single('file'), (req, res) => {
    const tmpfile = req.file
    console.log(tmpfile)
    uploadImageToStorage(tmpfile).then((success) => {
        res.status(200).send({
            status: 'success',
            url: success
        });
    }).catch((error) => {
        console.error(error);
    });
})
router.post("/uploadMultiFB", upload2.array('photos', 5), (req, res) => {
    const tmpFiles = req.files
    const promObj = tmpFiles.map((tmpfile) => {
        return uploadImageToStorage(tmpfile)
            .then(url => { return url })
    })
    Promise.all(promObj)
        .then((values) => { return values })
        .then((values) => { res.send(JSON.stringify(values)) })
        .catch((err) => { res.send(err) })

})

router.get("/clearImageFB", (req, res) => {
    bucket.getFiles(options)
        .then((res) => {
            files = res[0]
            const promisedOBJ = files.map((file) => {
                return bucket.file(file.name).delete()
                    .then((data) => { return true })
                    .catch((err) => { return false })
            })
            return Promise.all(promisedOBJ)
                .then((values) => { return values })
        })
        .then((values) => { res.send({ success: true }) })
        .catch((err) => { res.send({ success: false }) })
})

router.get("/getSignUrl", (req, res) => {
    bucket.getFiles(options)
        .then((res) => {
            const files = res[0]
            const promisedOBJ = files.map((file) => {
                return bucket.file(file.name).getSignedUrl({ action: 'read', expires: '03-17-2025' })
                    .then((res) => { return res[0] })
                    .catch((err) => { return false })
            })
            return Promise.all(promisedOBJ)
                .then((values) => { return values })
        })
        .then((values) => {
            res.send({ signUrl: values })
        })
        .catch((err) => {
            res.send({ success: false })
        })
})

//--------------------------------------------------------

const uploadImageToStorage = (file) => {
    let prom = new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${Date.now()}_${file.originalname}`;
        let fileUpload = bucket.file("Images/" + newFileName);
        
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            fileUpload.makePublic().then(() => {
                const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
                console.log(url)
                resolve(url)
              })
        })
        blobStream.end(file.buffer)
    });
    return prom;
}

module.exports = router