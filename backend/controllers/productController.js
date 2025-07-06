import express from 'express';
import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
// Function for adding product 

const addProduct = async (req,res)=>{

    // To add a product we will use a middleware --> MULTER
    // Because if we send any file in form data so that will be parsed using multer
    try {
        const { name , description , price ,category , subCategory , sizes ,bestSeller} = req.body
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]
// Array for Uploading the image on cloudinary
// This array will check for number of images we want to upload and 
// won't bother the undefined file that was requested but not given
        const images = [image1,image2,image3,image4].filter((item)=> item!== undefined)
// Cloudinary Upload
        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                // Getting a secure URL from Cloudinary 
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            bestSeller:bestSeller === "true" ? true : false,
            sizes:JSON.parse(sizes), // Converting from str to array
            image:imagesUrl,// From Cloudinary
            date:Date.now(Number)
        }
        console.log(productData);

        const product = new productModel(productData);

// Now saving product in DB
        await product.save()
        res.json({success:true,message:"Product Added"})
    }
    catch(error){
                console.log(error)
        res.json({success:false,message:error.message})
    }

    
}
// Function for listing product 
// It will return the porduct as a list[Array] so we can add it on our frontend
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Function for remove product 

const removeProduct = async (req,res)=>{
    try {
        // When calling the API we will send id to the body 
        // With that Id we will remove it from DB
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product removed"})
    }   
     catch(error){
        console.log(error);
    res.json({ success: false, message: error.message });

    }
}

// Function for single product information

const singleProduct = async (req,res)=>{
    try{
        // Requesting Id from body
        const { productId } = req.body
        // Checking the product model and calling the id and saving in product var
        const product = await productModel.findById(productId)
        res.json({success:true , product})
    } catch(error){
        console.log(error)
        res.json({success:false , message:error.message})
    }
}


export {listProducts ,addProduct ,removeProduct , singleProduct}