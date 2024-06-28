const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String },
    category: [ { type: String } ],
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Book', bookSchema);
