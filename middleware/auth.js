const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkForAuthenticationCookie = (req, res, next) => {
  try {
    //extract jwt token
    // console.log("token from body", req.body.token);
    // console.log("token from cookie", req.cookies.token);
    // console.log(
    //   "token from header",
    //   req.header("Authorization").replace("Bearer ", "")
    // );

    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    //verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(decode);
      req.user = decode;
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Token is Invalid" });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};

const isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user Role is not matching",
    });
  }
};
const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user Role is not matching",
    });
  }
};

module.exports = { checkForAuthenticationCookie, isStudent, isAdmin };
