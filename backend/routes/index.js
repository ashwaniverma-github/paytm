const express = require('express');
const router = express.router();
const userRouter = require("./user")

router.use('/user',userRouter)



module.exports = router;














