const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, updateCategoryById, deleteCategoryById, getCategoryById } = require('../controllers/categoryController');
const { auth, authorize } = require('../middlewares/auth');

// Create a new category
router.post('/', auth, authorize('Admin'), createCategory);

// Get all categories
router.get('/', auth, authorize('Admin'), getAllCategories);

// Get a category by ID
router.get('/:id', auth, authorize('Admin'), getCategoryById);

// Update a category by ID
router.put('/:id', auth, authorize('Admin'), updateCategoryById);

// Delete a category by ID
router.delete('/:id', auth, authorize('Admin'), deleteCategoryById);

module.exports = router;
