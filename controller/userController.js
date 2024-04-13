const { hashPassword, comparePassword } = require("../helper/userHelper");
const { User } = require("../model/userModel");

exports.registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email) {
      return res.send({
        message: "Enter Email",
      });
    }
    if (!lastName) {
      return res.send({
        message: "Enter lastName",
      });
    }
    if (!firstName) {
      return res.send({
        message: "Enter firstName",
      });
    }
    if (!password) {
      return res.send({
        message: "Enter password",
      });
    }
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists",
      });
    }
    console.log(email)
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in registering User",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({
        message: "Enter Email",
      });
    }
    if (!password) {
      return res.send({
        message: "Enter Password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Register First",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(201).send({
        success: false,
        message: "Wrong Credentials",
      });
    }

    res.status(201).send({
        success: true,
        message: "LoggedIn Successfully",
        user
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
