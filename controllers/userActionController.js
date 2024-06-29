const User = require('../models/userModel');
const Document = require('../models/documentModel');
const Library = require('../models/libraryModel');

// Controller for reading a document
exports.readDocument = async (req, res) => {
  try {
    const { documentId } = req.body;
    const userId = req.user.id;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let library = await Library.findOne();
    if (!library) {
      library = new Library();
    }

    // Update accessedDocuments, totalReading
    user.accessedDocuments.push({
      title: document.title,
      code: document.code,
      category: document.category,
      document: document._id,
      accessedAt: new Date()
    });
    user.totalReading += 1;
    library.totalReading += 1;

    await user.save();
    await library.save();

    res.status(200).json({ message: 'Document read action recorded successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record document read action' });
  }
};

// Controller for downloading a document
exports.downloadDocument = async (req, res) => {
  try {
    const { documentId } = req.body;
    const userId = req.user.id;

    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let library = await Library.findOne();
    if (!library) {
      library = new Library();
    }

    // Update accessedDocuments, totalDownload
    user.accessedDocuments.push({
      title: document.title,
      code: document.code,
      category: document.category,
      document: document._id,
      accessedAt: new Date()
    });
    user.totalDownload += 1;
    library.totalDownload += 1;

    await user.save();
    await library.save();

    res.status(200).json({ message: 'Document download action recorded successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record document download action' });
  }
};
