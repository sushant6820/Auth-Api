import express from "express";
import dotenv from "dotenv";
import connectiondb from "./db/dbconnection.js";
import bodyParser from "body-parser";
import userRouter from "./routes/usderRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

connectiondb();
app.use("/api", userRouter)


app.listen(port, ()=>{
    console.log(`the server is running on port number ${port}`)
})





