import multer from "multer";
import SharpMulter from "sharp-multer";
import { nanoid } from "nanoid";



// ===========================================================
const validationObject = {
    image: ['image/png', 'image/jpeg', 'image/gif'],
    files: ['application/pdf']
}
export const myMulter = () => {

    const storage = SharpMulter({
        destination: (req, file, callback) => {
            callback(null, "images")
        },
        filename: (req, file, cb) => {
            return `${nanoid(4)}--` + req
        },
        imageOptions: {
            quality: 80,
            resize: { width: 660, height: 900 },
        },
        
    });
    
    const fileFilter = (req, file, cb) => {
        if (validationObject.image.includes(file.mimetype)) {
            return cb(null, true)
        }
        cb(Error("invalid image extension", { cause: 400 }), false)
    }
    
    //==============================================================================
    const upload = multer({ fileFilter, storage })
    return upload
}



