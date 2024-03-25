const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json())
const mainRouter = require('./routes/index');
const port = 3000;

app.use('/api/v1',mainRouter)
app.use(cors());




app.listen(port,()=>{
    console.log(`app running at ${port}`)
})

