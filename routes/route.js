const { Router } = require("express");
const { signIn, signUp } = require("../controllers/auth");
const {
  checkForAuthenticationCookie,
  isStudent,
  isAdmin,
} = require("../middleware/auth");
const AUTH = require("../models/auth");

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get("/test", checkForAuthenticationCookie, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for Test",
  });
});

router.get("/student", checkForAuthenticationCookie, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for students",
  });
});
router.get("/admin", checkForAuthenticationCookie, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for Admin",
  });
});

//just for test in this we get id from req.user because in auth middleware we decodeded token and assigned decoded all value to req.user

// router.get("/getEmail", checkForAuthenticationCookie, async (req, res) => {
//   try {
//     const id = req.user.id;
//     const user = await AUTH.findById(id);
//     console.log("ID", id);
//     console.log(user);
//     res.status(200).json({
//       success: true,
//       Id: id,
//       email: user.email,
//       message: "welcome to the get Email route",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       message: "error in code",
//     });
//   }
// });

module.exports = router;
