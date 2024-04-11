import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'img/services/')
    },
    filename(req, file, cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 10
}

export const upload =  multer({
    storage,
    fileFilter,
    limits
})