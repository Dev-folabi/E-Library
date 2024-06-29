const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const storeInfoSchema = new mongoose.Schema({
    totalUser: { type: Number, default: 0 },
    totalDocument: { type: Number, default: 0 },
    totalCategroy: { type: Number, default: 0 },
    totalReading: { type: Number, default: 0 },
    totalDownload: { type: Number, default: 0 }
});

module.exports = mongoose.model('StoreInfo', storeInfoSchema);
