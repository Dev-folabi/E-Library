const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadDocument, getDocumentById, updateDocumentById, deleteDocumentById, getDocumentsByCategory, filterDocuments, searchDocuments } = require('../controllers/documentController');
const { authorize } = require('../middlewares/auth');
const { incrementTotalDocument } = require('../middlewares/libraryMiddleware');

// Upload a new document
router.post('/upload', authorize('Admin'), incrementTotalDocument, upload.single('document'), uploadDocument);

// Get a document by ID
router.get('/:id', getDocumentById);

// Update a document by ID
router.put('/:id', authorize('Admin'),  upload.single('document'), updateDocumentById);

// Delete a document by ID
router.delete('/:id', authorize('Admin'), deleteDocumentById);

// Get documents by category
router.get('/category/:category', getDocumentsByCategory);

// Filter documents by query parameters
router.get('/', filterDocuments);

// Search documents
router.get('/search', searchDocuments);

module.exports = router;
