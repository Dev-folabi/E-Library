const express = require('express');
const router = express.Router();
const { readDocument, downloadDocument } = require('../controllers/userActionController');
const { auth } = require('../middlewares/auth');

// Route for reading a document
router.post('/read', auth, readDocument);

// Route for downloading a document
router.post('/download', auth, downloadDocument);

module.exports = router;
