
const express = require("express");
const router = express.Router();
const {register,login} = require("../controllers/userController");
const {registerValidation,loginValidation} = require("../validations/userValidation");
router.post("/register",registerValidation,register);
router.post("/login",loginValidation,login)


module.exports = router;