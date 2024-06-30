const { incrementTotalCategory, decrementTotalCategory } = require('../middlewares/libraryMiddleware');
const Category = require('../models/categoryModel');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const category = Category.find({name})
    if(category) return res.status(400).json({ msg: "Category already exists" });

    const newCategory = new Category({ name });
    await newCategory.save();

    incrementTotalCategory()

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories.length) return res.status(404).json({ message: 'No categories found' });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Category ID is required' });

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!id || !name) return res.status(400).json({ message: 'Category name and ID are required' });

    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete a category by ID
exports.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Category ID is required' });

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

   decrementTotalCategory()
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
