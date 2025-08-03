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
            callback(null, "public/uploads") 
        },
        filename: (req, file, cb) => {
            return `${nanoid(4)}--` + req
            // cb(null, `${nanoid(4)}--${file.originalname}`);
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




// export const ResizeImages = async (req) => {
//     const __dirName = path.dirname(fileURLToPath(import.meta.url))
//     const fullPath = path.join(__dirName, `../uploads/images`)

//     const uniqueName = `${nanoid(4)}--${req.file.originalname}`
//     if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath, { recursive: true })
//     }
//     //   ============
//     const processedImage = await sharp(req.file.buffer).resize(500, 500,{
//         background:"#000"
//     }).toBuffer()
//     fs.writeFileSync(`${fullPath}/${uniqueName}`, processedImage)

// }
