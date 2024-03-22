const express = require('express')
const cors = require("cors")
const zod = require('zod')
const JWT_SECRET = require('../config')
const { authMiddleware } = require('../middleware')
app.use(express.json())
const router = express.router()


const signupSchema  = zod.object({
    username: zod.string(),
    password: zod.string(),
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
        return res.status(411).json({
            msg:"invalid inputs"
        })
    }
    const user = await User.findOne({
        username:req.body.username
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
        id:req.userId
    })   
    res.json({
        msg:"updated successfully"
    })
})

router.get('/bulk',async function(req,res,next){
    const filter  = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                $regex:filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})



module.exports = router