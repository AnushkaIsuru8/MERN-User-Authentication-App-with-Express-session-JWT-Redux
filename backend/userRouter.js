const express = require("express");
const {
  signUp,
  verifyToken

} = require("./userController");

const router = express.Router();

router.post("/signup", signUp);
router.get("/verifyToken", verifyToken);

module.exports = router;
