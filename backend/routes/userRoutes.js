const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const asyncHandler = require('express-async-handler');
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.route("/").get(allUsers);
router.route("/signup").post(registerUser);
router.post("/login", authUser);


module.exports = router;
