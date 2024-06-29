const fs = require('fs');
const path = require('path');

// Uploads Documents Directory middleware
exports.dir = (req, res, next) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    next();
};