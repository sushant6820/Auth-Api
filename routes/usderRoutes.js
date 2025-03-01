import express from "express";
import { register, login} from "../controller/usercontroller.js"

const userRouter = express.Router();

userRouter.post('/registeruser', register);
userRouter.post('/loginuser', login);

export default userRouter
