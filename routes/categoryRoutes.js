const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, updateCategoryById, deleteCategoryById, getCategoryById } = require('../controllers/categoryController');
const { authorize } = require('../middlewares/auth');
const { incrementTotalCategory, decrementTotalCategory } = require('../middlewares/libraryMiddleware');

// Create a new category
router.post('/',  authorize('Admin'), incrementTotalCategory, createCategory);

// Get all categories
router.get('/',  getAllCategories);

// Get a category by ID
router.get('/:id',  getCategoryById);

// Update a category by ID
router.put('/:id', authorize('Admin'), updateCategoryById);

// Delete a category by ID
router.delete('/:id', authorize('Admin'), decrementTotalCategory, deleteCategoryById);

module.exports = router;
