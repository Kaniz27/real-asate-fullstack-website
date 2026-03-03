const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const imageController = require('../controllers/imageController');

// Multer storage config - save to uploads/images with original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'images'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, png, gif, webp, svg)'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});

// GET /api/images - Public: list all images
router.get('/', imageController.listImages);

// POST /api/images/upload - Admin only: upload image
router.post(
  '/upload',
  authMiddleware.verifyToken,
  authMiddleware.requireAdmin,
  upload.single('image'),
  imageController.uploadImage
);

// DELETE /api/images/:filemena - Admin only: delete image
router.delete(
  '/:filename',
  authMiddleware.verifyToken,
  authMiddleware.requireAdmin,
  imageController.deleteImage
);

module.exports = router;
