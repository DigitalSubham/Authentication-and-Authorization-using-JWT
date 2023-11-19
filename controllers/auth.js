const AUTH = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signUp route handler

const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //check if user already exits
    const existingUser = await AUTH.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    //secure password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    const user = await AUTH.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "signup successfully",
    });
  } catch (error) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Signup fail",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please enter all details" });
    }
    let user = await AUTH.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Not registered user, signUp first" });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user loggedin successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
    });
  }
};

module.exports = { signUp, signIn };
