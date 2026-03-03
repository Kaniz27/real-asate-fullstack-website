const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'images');

// GET /api/images - List all uploaded images
exports.listImages = (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    const baseURL = `${req.protocol}://${req.get('host')}`;

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map((file) => ({
        filename: file,
        url: `${baseURL}/uploads/images/${file}`,
        uploadedAt: fs.statSync(path.join(UPLOADS_DIR, file)).mtime,
      }));

    res.status(200).json({ count: images.length, images });
  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/images/upload - Upload an image (admin only)
exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const baseURL = `${req.protocol}://${req.get('host')}`;
    const url = `${baseURL}/uploads/images/${req.file.filename}`;

    res.status(201).json({
      message: 'Image uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url,
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/images/:filename - Delete an image (admin only)
exports.deleteImage = (req, res) => {
  try {
    const { filename } = req.params;

    // Prevent directory traversal attacks
    const safeName = path.basename(filename);
    const filePath = path.join(UPLOADS_DIR, safeName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Image not found' });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ message: `Image "${safeName}" deleted successfully` });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: error.message });
  }
};
