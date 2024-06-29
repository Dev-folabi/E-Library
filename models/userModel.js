const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accessedDocumentSchema = new mongoose.Schema({
  title: { type: String },
  code: { type: String },
  category: [{ type: String }],
  document: { type: mongoose.Schema.Types.ObjectId, ref: "Document" }, 
  accessedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
  gender: { type: String },
  phone: { type: String },
  accessedDocuments: [accessedDocumentSchema],
  totalReading: { type: Number, default: 0 },
  totalDownload: { type: Number, default: 0 }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
