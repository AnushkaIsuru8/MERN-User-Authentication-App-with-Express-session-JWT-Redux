const express = require("express");
const {
  setUsername,
  register,
 login,
 verifyToken,
 loginSuccessfull,
 getUser,
 clearCookie2

} = require("./userController");

const router = express.Router();


router.post("/setusername", setUsername);
router.post("/register", register, loginSuccessfull);
router.post("/login", login, loginSuccessfull);
router.post("/user", verifyToken, getUser);
router.post("/clearCookie2", clearCookie2);

module.exports = router;
