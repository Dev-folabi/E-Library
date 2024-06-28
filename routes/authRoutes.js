const express = require('express');
const { auth } = require('../middlewares/auth');
const { adminSignup, AdminLogin, updateAdmin, userSignup, userLogin, updateUser } = require('../controllers/authController');

const router = express.Router();

// Admin Routes
router.post('/admin-signup', adminSignup);
router.post('/admin-login', AdminLogin);
router.put('/admin-update', auth, updateAdmin)

// User Routes
router.post('/user-signup', userSignup);
router.post('/user-login', userLogin);
router.put('/user-update', auth, updateUser)

module.exports = router;
