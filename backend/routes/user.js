const express = require('express')
const app = express();
app.use(express.json());
const cors = require("cors")
const zod = require('zod')
const jwt = require("jsonwebtoken")
const {User,Account} = require("../db")
const {JWT_SECRET} = require('../config')
const { authMiddleware } = require('../middleware')




const router = express.Router()


const signupSchema  = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName:zod.string(),
    lastName: zod.string()

})


router.post("/signup", async function(req,res){
    const body = req.body
    const {success} = signupSchema.safeParse(body)

    if(!success){
        return res.status(400).json({
            msg:"Invalid inputs"
        })
    }
    
    const user = await User.findOne({
        username:body.username
    })
    if(user){
        return res.json({
            msg:"Email already exist/Invalid input"
        })
    }

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    const userId = dbUser._id
    

    // Giving some money to the user 
    await Account.create({
        userId,
        balance: 1+ Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)
    res.json({
        msg:"User created successfully",
        token:token
    })

})

const signinSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post('/signin', async function(req,res){
    const body = req.body;
    console.log(req.body)
    const {success} = signinSchema.safeParse(body);

    if(!success){
        return res.status(411).json({
            msg:"invalid inputs",
        })
    }
    const user = await User.findOne({
        username:body.username,
        password:body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)
        res.json({
            token:token
        })
        return;
        }
    res.status(411).json({
        msg:"Error while logging in"
    })
})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put('/',authMiddleware,async function(req,res,next){
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg:"error while updating"
        })
    }
    await User.updateOne(req.body,{
        userId:req.userId
    })   
    res.json({
        msg:"updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports = router