import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

        name: {type: String, required:true},
 // Why added unique in email ?
 // For example a person is entering a email id and there already exist a emailID 
 // similar to that so it will show error message       
        email: {type: String, required:true, unique:true},
        password: {type: String, required:true},
        cartData: {type: Object, default:{}},
// Here is why we have added minimize:false
// When the user schema will be created the mongo will neglect the cartData
// because there is an null object entry but we want to create it so thats why we
// used it.
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel