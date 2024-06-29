const User = require('../models/userModel');
const Library = require('../models/libraryModel');

// User Dashboard
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('acceessedDocuments.document');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ accessedDocuments: user.acceessedDocuments, totalReading: user.totalReading, totalDownload: user.totalDownload });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user dashboard data' });
  }
};

// User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
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
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};
