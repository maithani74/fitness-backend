const express = require("express")
const mongoose =require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./route/userRoute")
const cors = require("cors")
const morgan = require("morgan")
const app = express();
dotenv.config()

const connectDb = async()=>{
    const con = await mongoose.connect(process.env.MONGO_URL)
    console.log("connected successfully")
}
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1/user",userRoute.router)
connectDb()

app.listen(8080,()=>{
    console.log("Server started at port 8080")
})