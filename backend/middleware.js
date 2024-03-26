const {JWT_SECRET} = require('./config')
const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader|| !authHeader.startsWith('Bearer')){
        res.status(403).json({})
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET)

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            res.status(403).json({})
        }
        
    }
    catch(err){
        return res.status(411).json({
            msg:"Verification failed",
            error:err.message
        })
    }
}


module.exports = {
    authMiddleware
}
