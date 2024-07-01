const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  document: { type: String, required: true },
  documentPublicId: { type: String, required: true },
  code: { type: String },
  category: [{ type: String }],
  cover: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);