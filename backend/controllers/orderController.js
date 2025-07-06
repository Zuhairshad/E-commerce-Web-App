import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// Placing order using cash on delivery method 

// orderController.js
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // 👈 now get from req.userId
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: 'Order Placed' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All orders data for Admin Panel
const allOrders = async (req ,res)=>{
try {
    const orders = await orderModel.find({})
    res.json({success:true , orders})
} catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
    
}
}
//User Order Data for frontend 
const UserOrders = async (req, res) => {
  try {
    const userId = req.userId; // this comes from your `authUser` middleware

    const orders = await orderModel.find({ userId });
    
    res.json({ success: true, orders }); // <- this must be an array
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Update Order Status from Admin Panel
const updateStatus = async (req ,res)=>{
  try{
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({ success: false, message: 'Order ID and status are required' });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', order: updatedOrder });
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export {placeOrder,allOrders,UserOrders,updateStatus}