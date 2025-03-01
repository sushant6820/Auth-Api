import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let mongodburl = process.env.MONGODBURL

const connectiondb = async ()=>{
    try {
        await mongoose.connect(mongodburl);
        console.log("connected to database")
    } catch (error) {
        console.log("error while connecting to database")
    }
}

export default connectiondb