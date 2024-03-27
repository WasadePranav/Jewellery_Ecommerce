
const express = require ("express") ;
const router = express.Router() ;
const {singUpValidation} = require ('../helper/validation')
const  userController = require ('../controller/userController')

router.post ('/register' ,singUpValidation,userController.register)

module.exports = router ;