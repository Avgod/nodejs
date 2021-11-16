const express = require("express");
const router = express.Router();
const middleware=require("../middlewares/validation")

const userController = require("../controllers/userController");

router.post("/signup",middleware.signUpValidation,userController.createUser)  //signup route

router.post('/login',middleware.loginValidation ,userController.loginUser)  //login route



module.exports = router;