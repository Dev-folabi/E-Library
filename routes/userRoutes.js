const express = require('express');
const router = express.Router();
const { getUserDashboard, getUserProfile, updateUserProfile }= require('../controllers/userController');
const { auth } = require('../middlewares/auth');

// User Dashboard
router.get('/dashboard', auth, getUserDashboard);

// User Profile
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);

module.exports = router;
