import express from "express"
import { loginUser , registerUser , adminLogin } from "../controllers/userController.js"

// Creating userRouter by express

const userRouter = express.Router();

// Using this router we will use get and post method 
// Using these routes we will create end points
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter;