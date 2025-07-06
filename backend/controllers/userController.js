import userModel from "../models/userModel.js";
import validator from 'validator';
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';

// To generate token we will make a function
// By using JsonwebToken
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Logic where we allow users to Login or Create an account
// Using for routes so we have req and res
// Route for user Login
const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

// If user is available with given emailId then it will be stored in the below var
    const user = await userModel.findOne({email});

// If user not availabe

    if (!user){
        return res.json({success:false,message:"User does not exists"})

    }
// Checking if user password matches with the one stored in DB 

    const isMatch = await bcrypt.compare(password,user.password)
    if (isMatch) {
        const token = createToken(user._id)
        res.json({success:true,token})
    }
// If user is Logining in with wrond password
else{
    res.json({success:false,message:'Invalid credentials'})
}
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Route for user registration
const registerUser = async (req,res)=>{
    // API hit for user login 
    // if anyone hits with name email and password then we will receive this info

    try {
            const {name, email ,password} = req.body;

        // checking if user already exists or not

            const exists = await userModel.findOne({email})
                // if already exists then it will be stored in the below var else undefined

            if (exists) {
                return res.json({success:false,message:"User already exists"})
            }
        // Validating email format and strong password by using validator
            if (!validator.isEmail(email)){
                 return res.json({success:false,message:"Please enter a valid email"})
            }
        // Strong Password
            if (password.length < 8){
                 return res.json({success:false,message:"Please enter a strong password"})
            }

        // Hashing Password and Storing in DB by BCrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Creating user 
        const newUser = new userModel({
            name,email,password:hashedPassword
        })
        //Saving in DB 
        const user = await newUser.save()
        
        // Providing token through which user can login in the application
        // Generating by using ID property of user
        const token = createToken(user._id)
        res.json({success:true,token})
    }
    catch(error){
            console.log(error)
            res.json({success:false,message:error.message})
    }
}

//Route for admin Login
//Adding Authentication for Admin 
//Why add authentication because our all product related APIs were open 
//Anyone can access through them and add or rm product 

const adminLogin = async (req,res)=>{
    try{
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            //Creating Token for Admin user
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
            }
        
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

export {loginUser , registerUser, adminLogin}