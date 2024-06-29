const User = require('../models/userModel');
const Library = require('../models/libraryModel');

// Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const libraryStats = await Library.findOne();
    res.status(200).json({ libraryStats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve admin dashboard data' });
  }
};

// Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve admin profile' });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const { name, email, gender, phone } = req.body;
    const admin = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, gender, phone },
      { new: true }
    );
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({ message: 'Profile updated successfully', admin });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin profile' });
  }
};
