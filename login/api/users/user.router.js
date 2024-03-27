
const { createUser ,getUsersByUserId, getUser,updateUser,deleteUser, login } = require("./user.controller");
const router = require ("express").Router();
// const userController = require('./user.controller');

const {checkToken} =require("../auth/token_validation")


router.post("/" , createUser);
router.get("/" , getUser);
router.get("/:id" , getUsersByUserId);
router.patch("/" , updateUser);
// router.delete("/:id " , deleteUser);
router.delete('/:id', deleteUser);
router.post("/login",login);



module.exports = router;
