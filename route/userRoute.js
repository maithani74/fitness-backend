const express = require("express");
const { registerController, loginController } = require("../controller/userController");
const router = express.Router();

router.post("/register",registerController)
.post("/login",loginController)

exports.router  =router;