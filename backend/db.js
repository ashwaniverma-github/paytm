const mongoose = require("mongoose")
import mongoose from "mongoose";
import { Schema } from "zod";

mongoose.connect("mongodb+srv://av1710334:KXFvqxbwCs0QaqoQ@cluster0.rxdzdmx.mongodb.net/paytm/")

const  userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});


const  User = mongoose.model("user-data",userSchema);
const Account = mongoose.model("account",accountSchema);

module.exports({
    User,
    Account
})


