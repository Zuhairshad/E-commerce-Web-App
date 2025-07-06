/** Add Products to user cart */

import userModel from "../models/userModel.js"

const addToCart = async (req,res)=>{
    try{
        const {userId , itemId, size} = req.body
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
                else{
                     cartData[itemId][size] = 1
                     }
    }
    else{
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    /**Finding particular user with this id that we get from decoded token and update the cart data  */
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true , message:"Added to Cart "})
}
catch (error){
    console.log(error);
    res.json({success:false , message:error.message})
    
    }
}
/** Updating user cart */

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (!cartData[itemId]) {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    if (quantity === 0) {
      // Remove size from item
      delete cartData[itemId][size];

      // If no sizes left, remove the item completely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // Set new quantity
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/** Getting the user cart */

const getUserCart = async (req,res)=>{
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        
        res.json({success:true ,cartData})
    }catch(error){
          console.log(error);
    res.json({success:false , message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}