const express = require("express");
const {
  setUsername,
  register,
 login,
 verifyToken,
 loginSuccessfull

} = require("./userController");

const router = express.Router();


router.post("/setusername", setUsername);
router.post("/register", register);
router.post("/login", login, loginSuccessfull);
router.post("/user", verifyToken);

module.exports = router;
