require('dotenv').config();
const express  = require("express");
const cors  = require("cors");
require('../service/connection')
const userRouter = require('./routes/userRoute')
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use('/api',userRouter);
// error handling 
app.use((err ,req ,res, next) => {

    err.statusCode = err.statusCode || 500 ;
    err.message = err.message || "internal server error"

    res.status(err.statusCode).json({
        message: err.message,
    });

});

app.listen(3000,()=>{
    console.log ("server is running on 3000")
})