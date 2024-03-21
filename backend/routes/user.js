const express = require('express')
const cors = require("cors")
const zod = require('zod')
const JWT_SECRET = require('../config')
app.use(express.json())
const router = express.router()


const signupSchema  = zod.object({
    username: zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName: zod.string()

})


router.post("/signup", async function(req,res){
    const body = req.body;

    const {success} = signupSchema.parse(req.body)
    if(!success){
        return res.json({
            msg:"Invalid inputs"
        })
    }
    const user = User.findOne({
        username:body.username
    })
    if(user._id){
        return res.json({
            msg:"Email already exist/Invalid input"
        })
    }

    const dbUser = await User.createOne({body})
    const token = jwt.sign({
        userId: dbUser._id
    },JWT_SECRET)
    res.json({
        msg:"User created successfully",
        token:token
    })



})

router.post('/signin', async function(req,res){
    const body = req.body.username;
    const {success} = signupSchema.parse(body);
    
    if(!success){
        return res.json({
            msg:"invalid inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username
    })

    if(user._id){
        res.json({
            token:token
        })

    }



})



module.exports = router