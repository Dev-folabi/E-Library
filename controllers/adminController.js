const Document = require('../models/documentModel');


// Upload a new Document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const document = req.file.path;

    const newDocument = new Document({
      title,
      document,
      code,
      category
    });

    await newDocument.save();
    res.status(201).json({ message: 'Document uploaded successfully', Document: newDocument });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload Document' });
  }
};

// Get a Document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const Document = await Document.findById(req.params.id);
    if (!Document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(Document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Document' });
  }
};

// Update a Document by ID
exports.updateDocumentById = async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const updatedData = { title, code, category };

    if (req.file) {
      updatedData.document = req.file.path;
    }

    const Document = await Document.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!Document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document updated successfully', Document });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Document' });
  }
};

// Delete a Document by ID
exports.deleteDocumentById = async (req, res) => {
  try {
    const Document = await Document.findByIdAndDelete(req.params.id);
    if (!Document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Document' });
  }
};

// Get Documents by category
exports.getDocumentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const Documents = await Document.find({ category: category });
    res.status(200).json(Documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Documents' });
  }
};

// Filter Documents by query
exports.filterDocuments = async (req, res) => {
  try {
    const filter = req.query;
    const Documents = await Document.find(filter);
    res.status(200).json(Documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter Documents' });
  }
};

// Search Documents
exports.searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;
    const Documents = await Document.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { code: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(Documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search Documents' });
  }
};
