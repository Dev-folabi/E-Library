const Admin = require('../models/adminModel');
const Library = require('../models/libraryModel');
const { updateAdminSchema } = require('../config/validation');


// Get Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const libraryStats = await Library.findOne();
    res.status(200).json({ libraryStats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve admin dashboard data' });
  }
};

// Get Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ Message: 'Failed to retrieve Admin profile', Error: error.message });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  const { error } = updateAdminSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  try {
    const { name, email, gender, phone } = req.body;
    const admin = await Admin.findByIdAndUpdate(
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
