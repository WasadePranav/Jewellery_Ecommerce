require('dotenv').config();
const express = require ("express");

const app = express();
const bodyParser = require('body-parser');

const userRouter = require("./api/users/user.router")
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users",userRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log ("server is running at:" ,process.env.APP_PORT)
    
})