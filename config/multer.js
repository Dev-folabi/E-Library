const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileType = file.mimetype.split('/')[0];
    return {
      folder: fileType === 'image' ? 'images' : 'documents', // Organize uploads into folders
      resource_type: fileType === 'image' ? 'image' : 'raw', // 'raw' for non-image files
      public_id: file.originalname.split('.')[0],
      format: fileType === 'image' ? undefined : file.originalname.split('.').pop(), // Maintain original format
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
