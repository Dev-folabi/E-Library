const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
