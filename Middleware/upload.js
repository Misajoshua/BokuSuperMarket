const multer = require('multer');
const {cloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');


const storage = new cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bokusupermarket',
        allowedFormats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
