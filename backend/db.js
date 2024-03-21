const mongoose = require("mongoose")
import mongoose from "mongoose";
import { Schema } from "zod";

mongoose.connect("mongodb+srv://av1710334:KXFvqxbwCs0QaqoQ@cluster0.rxdzdmx.mongodb.net/paytm/")

const  userSchema = mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const  User = mongoose.model("user-data",userSchema)

module.exports({
    User
})


