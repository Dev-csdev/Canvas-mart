import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetypes = /image\/jpeg|image\/jpg|image\/png|image\/webp/;
    const extname = path.extname(file.originalname).toLowerCase().slice(1);
    const mimetype = file.mimetype
    
    if (filetypes.test(extname) && mimetypes.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
    fileFilter: fileFilter
});

const uploadSingleImage = upload.single('image')

router.post('/', (req,res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({message: err.message})
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`
            })
        } else {
            res.status(400).send({message: "No image file provided"});
        }
    })
})

export default router;