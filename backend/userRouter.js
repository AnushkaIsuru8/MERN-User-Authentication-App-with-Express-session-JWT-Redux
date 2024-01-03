const express = require("express");
const {
  setUsername,
  register,
  login,
  loginSuccessfull,
  verifyToken,
  getUser,
  refreshAuth,
  clearCookie2

} = require("./userController");

const router = express.Router();


router.post("/setusername", setUsername);
router.post("/register", register, loginSuccessfull, getUser);
router.post("/login", login, loginSuccessfull, getUser);
router.post("/user", verifyToken, getUser);
router.post("/refreshAuth", verifyToken, refreshAuth, getUser);
router.post("/clearCookie2", clearCookie2);

module.exports = router;
