const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  }
},{timestamps:true});


exports.User = mongoose.model("User",userSchema)