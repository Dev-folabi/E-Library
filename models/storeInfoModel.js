const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const storeInfoSchema = new mongoose.Schema({
    totaluser: { type: Number, default: 0 },
    totalBook: { type: Number, default: 0 },
    totalCategroy: { type: Number, default: 0 },
    totalReading: { type: Number, default: 0 },
    totalDownload: { type: Number, default: 0 }
});

module.exports = mongoose.model('StoreInfo', storeInfoSchema);
