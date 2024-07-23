const express = require('express');
const router = express.Router();
const { getAdminDashboard, getAdminProfile, updateAdminProfile } = require('../controllers/adminController');
const { authorize, auth } = require('../middlewares/auth');
const { deleteAdmin } = require('../controllers/authController');

// Admin Dashboard
router.get('/dashboard', authorize('Admin'), getAdminDashboard);

// Admin Profile
router.get('/profile', authorize('Admin'), getAdminProfile);

// Update Profile 
router.put('/profile', authorize('Admin'), updateAdminProfile);

// Delete Profile
router.delete('/delete', auth, deleteAdmin)

module.exports = router;
