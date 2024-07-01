const User = require('../models/userModel');
const Library = require('../models/libraryModel');
const { updateUserSchema } = require('../config/validation');

// Get User Dashboard
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('accessedDocuments.document');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      totalReading: user.totalReading,
      totalDownload: user.totalDownload,
      accessedDocuments: user.accessedDocuments
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve user dashboard data',
      error: error.message,
    });
  }
};


// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ Message: 'Failed to retrieve user profile', Error: error.message });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  try {
    const { name, email, gender, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, gender, phone },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ Message: 'Failed to update user profile', Error: error.message });
  }
};
