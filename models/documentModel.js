const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String },
    category: [ { type: String } ],
    document: { type: String, required: true },
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Document', documentSchema);
