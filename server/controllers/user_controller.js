const asyncHandler = require("express-async-handler");
const User = require("../models/user_model");
const generateToken = require("../config/jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const sendMail = require("../utils/reset-password-nodemailer");
const e = require("express");
const createUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    isAdmin,
    password,
    rollNo,
    linkedin_url,
    github_username,
    resume_url,
    portfolio_url,
    twitter_url,
    instagram_url,
    leetcode_username,
    codeforces_username,
    // image,
  } = req.body;
  // console.log(image);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  var salt = await bcrypt.genSalt(10);

  // const uploadedFile = await cloudinary.uploader.upload(image, {
  //   folder: "hgv2",
  // });

  const uploadedFile = {
    secure_url: "#",
  };

  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, salt),
    rollNo: rollNo !== undefined ? rollNo : null,
    linkedin_url: linkedin_url !== undefined ? linkedin_url : null,
    github_username: github_username !== undefined ? github_username : null,
    resume_url: resume_url !== undefined ? resume_url : null,
    portfolio_url: portfolio_url !== undefined ? portfolio_url : null,
    twitter_url: twitter_url !== undefined ? twitter_url : null,
    instagram_url: instagram_url !== undefined ? instagram_url : null,
    leetcode_username:
      leetcode_username !== undefined ? leetcode_username : null,
    codeforces_username:
      codeforces_username !== undefined ? codeforces_username : null,
    image: uploadedFile.secure_url,
    isAdmin: isAdmin !== undefined ? isAdmin : true,
  });
  const result = await newUser.save();
  if (result) {
    res.status(201).json({
      newUser,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...docs } = user.toObject();
    res.status(200).json({
      user: docs,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  try {
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error in finding users", err });
  }
});
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id }).populate("projectsInvolved");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in finding user", error });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  try {
    if (user) {
      const {
        linkedin_url,
        github_username,
        resume_url,
        portfolio_url,
        twitter_url,
        instagram_url,
        leetcode_username,
        codeforces_username,
        image,
      } = req.body;
      var uploadedFile;
      if (image) {
        uploadedFile = await cloudinary.uploader.upload(image, {
          folder: "hgv2",
        });
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: id },
          {
            linkedin_url:
              linkedin_url !== undefined ? linkedin_url : user.linkedin_url,
            github_username:
              github_username !== undefined
                ? github_username
                : user.github_username,
            resume_url: resume_url !== undefined ? resume_url : user.resume_url,
            portfolio_url:
              portfolio_url !== undefined ? portfolio_url : user.portfolio_url,
            twitter_url:
              twitter_url !== undefined ? twitter_url : user.twitter_url,
            instagram_url:
              instagram_url !== undefined ? instagram_url : user.instagram_url,
            leetcode_username:
              leetcode_username !== undefined
                ? leetcode_username
                : user.leetcode_username,
            codeforces_username:
              codeforces_username !== undefined
                ? codeforces_username
                : user.codeforces_username,
            image: image !== undefined ? uploadedFile.secure_url : user.image,
          },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "updated user successfully", updatedUser });
      } catch (error) {
        res.status(500).json({ message: "Error in updating User", error });
        console.log("Error in updating user");
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error in finding user");
    res.status(500).json({ message: "Error in finding user", error });
  }
});
// const updateAdmin=asyncHandler(async(req,res)=>{
//   const id=req.params.id;
//   try{

//   }
// })
const updatePassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      const { oldpassword, newpassword } = req.body;
      const compare = await bcrypt.compare(oldpassword, user.password);
      if (compare) {
        var salt = await bcrypt.genSalt(10);
        try {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            {
              password: await bcrypt.hash(newpassword, salt),
            },
            { new: true }
          );
          res
            .status(200)
            .json({ message: "Password updated successfully", updatedUser });
        } catch (error) {
          res.status(500).json({ message: "Error in updating password" });
        }
      } else {
        res.status(400).json({ message: "Old Password doesnot match" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Password updating error");
    res.status(500).json({ message: "Error in updating password", error });
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User with this email does not exist" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + 300,
  });


  const message = `Click the following link to reset your password: ${process.env.FRONTEND_URL}/account/reset-password?token=${token}`;

  sendMail(
    "alokgupta1560@gmail.com",
    "motivationwallah1560@gmail.com",
    message
  );

  return res.status(200).json({
    message: "Email sent successfully",
    success: true,
    err: {},
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;

  let password = req.body.password;

  const isValidToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!isValidToken) {
    return res.status(400).json({ message: "Token Expired" });
  }
  var salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const user = await User.findByIdAndUpdate(
    isValidToken.id,
    { password },
    { new: true }
  )
    .select("-password")
    .exec();
  return res.status(200).json({
    message: "Password Reset Successfully",
    data: user,
    success: true,
  });
});

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword,
  forgetPassword,
  resetPassword,
};
