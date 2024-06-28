const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const {
    adminSignupSchema,
    userSignupSchema,
    adminLoginSchema,
    userLoginSchema,
    updateAdminSchema,
    updateUserSchema
} = require("../config/validation");

// Admin Signup
exports.adminSignup = async (req, res) => {
  const { error } = adminSignupSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email, password, role } = req.body;

  try {
    
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ msg: "Admin already exists" });

    admin = new Admin({
        name, email, password, role
    });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      msg: "Admin signed up successfully",
      token,
      admin: _.omit(admin.toObject(), ["password"]),
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

// User Signup
exports.userSignup = async (req, res) => {
  const { error } = userSignupSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email, password, role, gender, phone } = req.body;

  try {

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({
        name, email, password, role, gender, phone
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      msg: "User signed up successfully",
      token,
      user: _.omit(user.toObject(), ["password"]),
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

// Admin Login
exports.AdminLogin = async (req, res) => {
  const { error } = adminLoginSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "Admin logged in successfully",
      token,
      admin: _.omit(admin.toObject(), ["password"]),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error, please try again later." });
  }
};

// user Login
exports.userLogin = async (req, res) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "User logged in successfully",
      token,
      admin: _.omit(user.toObject(), ["password", "__v"]),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error, please try again later." });
  }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
  const { error } = updateAdminSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email } = req.body;

  try {

    const existAdmin = await Admin.findById(req.user._id);
    if (!existAdmin) return res.status(400).json({ msg: "Admin does not exist" });

    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.user._id,
      { name, email },
      { new: true }
    );

    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email, gender, phone } = req.body;

  try {

    const existUser= await User.findById(req.user._id);
    if (!existUser) return res.status(400).json({ msg: "User does not exist" });

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
      { name, email, gender, phone },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
