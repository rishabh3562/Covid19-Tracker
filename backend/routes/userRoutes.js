const express = require("express");
const {
  authUser,
  allUsers,
  updateUser,
  deleteUser
} = require("../controllers/userControllers");
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
 // Import the Cloudinary SDK
const router = express.Router();
const path = require('path');
const generateToken = require('../config/generateToken');
const fs = require('fs');
// Configure Cloudinary
const cloudinary = require('../utils/cloudinary');

// Configure multer for image upload
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Route for uploading user images to Cloudinary
router.post('/upload', upload.single('image'), asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  // Find the user based on the user ID
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user-profiles' // Specify the folder where you want to store images
    });

    // Update the user's pic field with the Cloudinary image URL
    user.pic = uploadResult.secure_url;
    await user.save();

    // Delete the local image file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
}));
// router.route('/:id').put(updateUser );
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route("/").get(allUsers);
// router.route("/signup").post(registerUser);
router.post("/login", authUser);
// Route for entering user data
router.post("/signup", asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
console.log("req.body in signup route :", req.body)
  // Validate user input (you can add more validation here)

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // Create the user
  const newUser = await User.create({ name, email, password });
  console.log("newUser in signup route :", newUser)
  // Generate a JWT token for the newly registered user
  const token = generateToken(newUser._id);
  
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: token,
  });
})
);



// Route for uploading user images
// router.post('/upload', upload.single('image'), asyncHandler(async (req, res) => {
//   const userId = req.query.userId; // Get the user ID from the query parameters if needed

//   // Find the user based on the user ID
//   const user = await User.findById(userId);
// console.log("\n\n\nuser in upload route :", user)

//   if (!user) {
//     res.status(404).json({ message: 'User not found' });
//     return;
//   }
//   console.log("\n\n\nreq in upload route :", req)
//   console.log("\n\n\nreq.file in upload route :", req.file)
// console.log("\n\n\nreq.file.path in upload route :", req.file.path)
//   // Update the user's pic field with the image path
//   user.pic = req.file.path;
//   await user.save();

//   res.status(200).json({ message: 'Image uploaded successfully' });
// })
// );




router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      username: user.username,
      pic: user.pic // Send the image path
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = router;
