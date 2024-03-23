const express = require('express');
const app = express();
const router = router.express();
const {authMiddleware} = require('../middleware')
const {Account} = require('../db')
const {default:mongoose} = require('mongoose')



router.get('/balance',authMiddleware,async function(req,res){
    const account = await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })

})

router.post('/transfer',authMiddleware,async function(req,res){

    const session = await  mongoose.startSession();
    
    session.startTransaction();
    const {amount,to} = req.body;

    // fetch the account within the transaction
    const account = await Account.findOne({userId:req.userId}).session(session);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.json({
            msg:"Insufficient funds"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg:"invalid userId"
        })
    }
    
    // perform the transaction 

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    //commit the tramsaction

    await session.commitTransaction();
    res.json({
        msg:"Transfer successful"
    });
})

module.exports = router
