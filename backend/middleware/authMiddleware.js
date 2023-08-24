const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("req.headers.authorization in protect middleware :", req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("token after splitting in protect middleware :", token)
      //decodes token id
      console.log("process.env.JWT_SECRET in protect middleware :", process.env.JWT_SECRET)
      console.log(token.trim() === process.env.JWT_SECRET)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded in protect middleware :", decoded)

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
