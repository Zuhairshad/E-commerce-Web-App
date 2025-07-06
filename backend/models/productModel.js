import mongoose, { Mongoose } from "mongoose";

// Creating Schema for DB

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    category: {type:String, required:true},
    subCategory: {type:String, required:true},
    sizes: {type:Array, required:true},
    bestSeller: {type:Boolean},
    date: {type:Number, required:true}

})
// Our model will be created for the product according to schema
// Left side is when Already existing product model is available it will use it
// Right side is when there is no such model it will create one

const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel