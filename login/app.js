 require("dotenv").config();
 const bodyParser = require('body-parser');
 
 const express = require ('express')
 const app = express();
 app.use(bodyParser.json()); 
 const userRouter  = require("./api/users/user.router");
// const { create } = require("./api/users/user.service");

app.use(express.json());


app.use("/api/users",userRouter)
 app.listen(process.env.APP_PORT,()=>{
    console.log( 'server is  running at : ' ,process.env.APP_PORT)
 });