const express = require('express');
const router = express.Router();
const { getAdminDashboard, getAdminProfile, updateAdminProfile } = require('../controllers/adminController');
const { authorize } = require('../middlewares/auth');

// Admin Dashboard
router.get('/dashboard', authorize('Admin'), getAdminDashboard);

// Admin Profile
router.get('/profile', authorize('Admin'), getAdminProfile);
router.put('/profile', authorize('Admin'), updateAdminProfile);

module.exports = router;
