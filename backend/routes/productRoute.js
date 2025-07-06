import express from 'express'
import { listProducts, addProduct ,removeProduct,singleProduct  } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

//Creating router using express
const productRouter = express.Router();
// Using post method
// Feilds is used for multipart data like 4-5 pictures we have to parse of a product
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
//Using get method
productRouter.get('/list',listProducts)

export default productRouter


