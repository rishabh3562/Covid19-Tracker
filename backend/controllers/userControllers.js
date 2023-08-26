const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log("\n\nuserId in deleteUser route :", userId)
  // Perform any additional checks you need, like ensuring the user is an admin

  try {
    const user = await User.findById(userId);
console.log("\n\nuser in deleteUser route :", user)
    if (user) {
      const data =  await User.findByIdAndDelete(req.params.id);
      console.log("\n\data in deleteUser route :",data)
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//@route           POST /api/user/
//@access          Public

//without pic
// const registerUser = asyncHandler(
//   asyncHandler(async (req, res) => {
//       const { name, email, password } = req.body;

//       // Validate user input (you can add more validation here)

//       // Check if user already exists
//       const existingUser = await User.findOne({ email });

//       if (existingUser) {
//         res.status(400).json({ message: 'User already exists' });
//         return;
//       }

//       // Create the user
//       const newUser = await User.create({ name, email, password });
//       console.log("newUser in signup route :", newUser)
//       // Generate a JWT token for the newly registered user
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//         expiresIn: '30d', // Token expires in 1 day
//       });
//       console.log("token in signup route :", token)
//       res.status(201).json({
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         token: token,
//       });
//     })
// );
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  console.log("\n\nuserId in updateUser route :", userId)
  console.log("\n\nupdatedUser in updateUser route :", updatedUser)
  try {
    const user = await User.findById(userId);
    console.log("\n\nuser in updateUser route :", user)
    if (user) {
      user.name = updatedUser.name || user.name;
      user.email = updatedUser.email || user.email;
      console.log("\n\nuser.name in updateUser route :", user.name)
      console.log("\n\nuser.email in updateUser route :", user.email)
      // Be careful with passwords
      // Update other fields as needed

      const updatedUserInfo = await user.save();
      console.log("\n\nupdatedUserInfo in updateUser route :", updatedUserInfo)
      res.status(200).json(updatedUserInfo);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, pic } = req.body;

//   if (!name || !email || !password) {
//     res.status(400);
//     throw new Error("Please Enter all the Feilds");
//   }

//   const userExists = await User.find({ email });
//   console.log(userExists)
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     pic,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       pic: user.pic,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }
// });

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, authUser, updateUser, deleteUser };
