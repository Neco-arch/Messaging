const express = require('express')
const { authenticateToken } = require('../controller/auth_controller.js')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path')

const { ChangeBio, ChangeProfilePicture, ChangeUsername } = require('../controller/profile_controller.js')

const profile = express()



// Multer and cloudinary Middleware
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (isMatch) {
            return cb(null, true);
        }
        cb(new Error('Error: Only images are allowed!'));
    }

})

// Route

profile.post('/profilepicture', authenticateToken, upload.single('profilepic'), ChangeProfilePicture)
profile.put('/changeusername', authenticateToken, ChangeUsername)
profile.put('/changebio', authenticateToken, ChangeBio)


module.exports = profile





