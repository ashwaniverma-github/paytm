const express = require('express');
const app = express();
app.use(express.json())
const router = express.Router();
const userRouter = require("./user")
const accountRouter = require("./account")

router.use('/user',userRouter)
router.use('/account',accountRouter)



module.exports = router;














