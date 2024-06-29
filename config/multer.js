const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Directory path for uploads 
const uploadDir = path.join(__dirname, process.env.UPLOAD_DIRECTORY || 'uploads');

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
