// Middle ware for those APIs where we need the Admin permissions such as 
// Adding removing displaying order etc 
import jwt from 'jsonwebtoken';
// Here next is a call back function
const adminAuth = async (req,res,next)=>{
  try {
    // In the headers we are getting the token after the admin login
    const {token} = req.headers
    //Checking if the token is available we will decode it
    //Else we will display a message that the user isn't authorized for making changes
    if (!token){
        return res.json({success:false , message: "Not Authorized Login Again"})
    }
    //Decoding token through jwt
    const token_decode= jwt.verify(token,process.env.JWT_SECRET)
    //If the decoded token isn't matching with the string it means user isn't authorized
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.json({success:false , message: "Not Authorized Login Again"})
    }
    // If all good then we will call the callback func next()..
    next()
    
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
export default adminAuth