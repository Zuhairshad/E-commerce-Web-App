import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongoDB.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import connectCloudinary from './config/cloudinary.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// App Config
const app =  express();
app.use(express.json());

// process.env.PORT (If a server is available then run on that server else 4000)
const port = process.env.PORT || 4000 
connectDb();
connectCloudinary();

// Middlewares
// After we will get the request that we parse using json 
app.use(express.json()) 

// using this we can access backend from any IP 
app.use(cors())

// API Endpoints 
app.get('/' , (req,res)=>{
res.send('API Working')
})
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
// Starting express server

app.listen(port , ()=> console.log('Server Running on port : ' + port));
