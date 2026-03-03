const express = require('express');
const router = express.Router();
const siteContentController = require('../controllers/siteContentController');
const authMiddleware = require('../middleware/authMiddleware');

// Why Choose Us - GET is public
router.get('/why-choose-us', siteContentController.getWhyChooseUsItems);
// POST, PUT, DELETE require admin
router.post('/why-choose-us', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.addWhyChooseUsItem);
router.put('/why-choose-us/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.updateWhyChooseUsItem);
router.delete('/why-choose-us/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.deleteWhyChooseUsItem);

// Testimonials - GET is public
router.get('/testimonials', siteContentController.getTestimonials);
router.get('/testimonials/all', siteContentController.getAllTestimonials);
// POST, PUT, PATCH, DELETE require admin
router.post('/testimonials', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.addTestimonial);
router.put('/testimonials/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.updateTestimonial);
router.patch('/testimonials/:id/approve', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.approveTestimonial);
router.delete('/testimonials/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.deleteTestimonial);

// Call Now Settings - GET is public
router.get('/settings/call-now', siteContentController.getCallNowSetting);
// PUT requires admin
router.put('/settings/call-now', authMiddleware.verifyToken, authMiddleware.requireAdmin, siteContentController.updateCallNowSetting);

module.exports = router;
