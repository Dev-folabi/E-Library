const Document = require('../models/documentModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Upload a new Document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'documents'
    });
console.log(result)
    // Remove file from server after upload
    fs.unlinkSync(file.path);

    const newDocument = new Document({
      title,
      document: result.secure_url,
      code,
      category
    });

    await newDocument.save();

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload document' });
  }
};

// Get a Document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve document' });
  }
};

// Update a Document by ID
exports.updateDocumentById = async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const updatedData = { title, code, category };

    if (req.file) {
      // Upload new file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'documents'
      });

      // Remove file from server after upload
      fs.unlinkSync(req.file.path);

      updatedData.document = result.secure_url;
    }

    const document = await Document.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document updated successfully', document });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
};

// Delete a Document by ID
exports.deleteDocumentById = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
};

// Get Documents by category
exports.getDocumentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const documents = await Document.find({ category: category });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve documents' });
  }
};

// Filter Documents by query
exports.filterDocuments = async (req, res) => {
  try {
    const filter = req.query;
    const documents = await Document.find(filter);
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter documents' });
  }
};

// Search Documents
exports.searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;
    const documents = await Document.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { code: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search documents' });
  }
};
