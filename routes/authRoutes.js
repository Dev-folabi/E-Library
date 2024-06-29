const express = require('express');
const { adminSignup, AdminLogin, userSignup, userLogin, } = require('../controllers/authController');
const { incrementTotalUser } = require('../middlewares/libraryMiddleware');

const router = express.Router();

// Admin Routes
router.post('/admin-signup', adminSignup);
router.post('/admin-login', AdminLogin);


// User Routes
router.post('/user-signup', incrementTotalUser, userSignup);
router.post('/user-login', userLogin);


module.exports = router;
