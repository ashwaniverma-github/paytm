const express = require('express');
const router = express.router();
const userRouter = require("./user")
const accountRouter = require("./account")

router.use('/user',userRouter)
router.use('/account',accountRouter)


module.exports = router;














