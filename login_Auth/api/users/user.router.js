const { createUser,getByUserId,getUser,updateUser,deleteUser,login } =require("./user.controller");
// const { create } = require("./user.service");
const router =require("express").Router();

router.post("/", createUser);
router.get("/", getUser);
router.get("/id", getByUserId);
router.patch("/", updateUser);
router.delete("/", deleteUser);
router.post ("/login", login)

module.exports= router;