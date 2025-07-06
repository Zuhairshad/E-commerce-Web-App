import express from 'express'
import {placeOrder,allOrders,UserOrders,updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/Auth.js'
const orderRouter = express.Router()

//This Route for Admin panel where all the placed orders will be displayed

orderRouter.post('/list',adminAuth,allOrders)

//This route is to update order status
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
//For cash on delivery
orderRouter.post('/place',authUser,placeOrder)

//User Features
orderRouter.post('/userorders',authUser,UserOrders)

export default orderRouter