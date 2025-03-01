import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  dotenv from "dotenv";

dotenv.config();

let jwt_secret = process.env.JWT_SECRET

export const register = async (req, res)=>{
const { name, email, password } = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) return res.status(400).json({ message : "user already exists"})

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User({name, email,
        password : hashedPassword })

        await user.save()
   

        res.status(201).json({ message : " user registered suceessfully"})
}


export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" }); 
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, jwt_secret);
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  