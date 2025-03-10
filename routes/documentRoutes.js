const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadDocument, getDocumentById, updateDocumentById, deleteDocumentById, getDocumentsByCategory, searchDocuments, getRandomDocuments, getLatestDocuments, getDocumentsByLevel } = require('../controllers/documentController');
const { authorize } = require('../middlewares/auth');
const { dir } = require('../middlewares/uploadDirctoryMiddleware');


// Search documents
router.get('/search', searchDocuments);

// Get the latest 30 documents
router.get('/latest', getLatestDocuments);

// Get random 30 documents
router.get('/random', getRandomDocuments);

// Upload a new document
router.post('/upload', authorize('Admin'),  dir, upload.single('document'), uploadDocument);

// Get a document by ID
router.get('/:id', getDocumentById);

// Update a document by ID
router.put('/:id', authorize('Admin'), dir,  upload.single('document'), updateDocumentById);

// Delete a document by ID
router.delete('/:id', authorize('Admin'), deleteDocumentById);

// Get documents by category
router.get('/category/:category', getDocumentsByCategory);

// Get documents by Level
// router.get('/level/:level', getDocumentsByLevel);

module.exports = router;
