const Document = require('../models/documentModel');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const { incrementTotalDocument, decrementTotalDocument } = require('../middlewares/libraryMiddleware');

// Upload a new Document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, code, category } = req.body;

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'documents',
      use_filename: true,
      unique_filename: false
    });

    // Remove file from server after upload
    fs.unlinkSync(req.file.path);

    const newDocument = new Document({
      title,
      document: result.secure_url,
      documentPublicId: result.public_id,
      code,
      category
    });

    await newDocument.save();

    incrementTotalDocument()

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to upload document', details: error.message });
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
    res.status(500).json({ error: 'Failed to retrieve document', details: error.message });
  }
};

// Update a Document by ID
exports.updateDocumentById = async (req, res) => {
  try {
    const { title, code, category } = req.body;
    const documentId = req.params.id;

    // Find the document to get the current Cloudinary public ID
    const existingDocument = await Document.findById(documentId);
    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const updatedData = { title, code, category };

    if (req.file) {
      // Delete the old file from Cloudinary
      const oldPublicId = existingDocument.documentPublicId;
      await cloudinary.uploader.destroy(oldPublicId);

      // Upload the new file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'documents',
        use_filename: true,
        unique_filename: false
      });

      // Remove file from server after upload
      fs.unlinkSync(req.file.path);

      updatedData.document = result.secure_url;
      updatedData.documentPublicId = result.public_id;
    }

    const updatedDocument = await Document.findByIdAndUpdate(documentId, updatedData, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ message: 'Document updated successfully', document: updatedDocument });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to update document', details: error.message });
  }
};

// Delete a Document by ID
exports.deleteDocumentById = async (req, res) => {
  try {
    const documentId = req.params.id;

    // Find the document to get the Cloudinary public ID
    const existingDocument = await Document.findById(documentId);
    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete the file from Cloudinary
    const publicId = existingDocument.documentPublicId;
    await cloudinary.uploader.destroy(publicId);

    // Delete the document from the database
    await Document.findByIdAndDelete(documentId);

    decrementTotalDocument()
    
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document', details: error.message });
  }
};

// Get Documents by category
exports.getDocumentsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const documents = await Document.find({ category });
    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: 'No documents found for the specified category' });
    }
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve documents', details: error.message });
  }
};

// Filter Documents by query
exports.filterDocuments = async (req, res) => {
  try {
    const filter = req.query;
    const documents = await Document.find(filter);
    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: 'No documents found matching the specified criteria' });
    }
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter documents', details: error.message });
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
    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: 'No documents found matching the search criteria' });
    }
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search documents', details: error.message });
  }
};

// Get the latest 30 documents
exports.getLatestDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 }).limit(30);
    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: 'No documents found' });
    }
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the latest documents', details: error.message });
  }
};

// Get random 30 documents
exports.getRandomDocuments = async (req, res) => {
  try {
    const count = await Document.countDocuments();
    const randomDocuments = await Document.aggregate([{ $sample: { size: Math.min(count, 30) } }]);
    if (!randomDocuments || randomDocuments.length === 0) {
      return res.status(404).json({ error: 'No documents found' });
    }
    res.status(200).json(randomDocuments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve random documents', details: error.message });
  }
};
