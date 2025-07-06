import multer from "multer";

// Creating Storage configuration

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

// Using this diskStorage creating a Upload middleware

const upload = multer({storage})

export default upload