const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply JWT verification and admin check to all routes
router.use(authMiddleware.verifyToken);
router.use(authMiddleware.requireAdmin);

// Hero Routes
router.put('/hero/text', adminController.updateHeroText);
router.post('/hero/images', adminController.addHeroImage);
router.delete('/hero/images/:id', adminController.deleteHeroImage);
router.patch('/hero/buttons/:id', adminController.updateButton);

// Location Routes
router.post('/locations', adminController.addLocation);
router.delete('/locations/:id', adminController.deleteLocation);

// Property Type Routes
router.post('/property-types', adminController.addPropertyType);
router.delete('/property-types/:id', adminController.deletePropertyType);

// Property Routes
router.post('/properties', adminController.addProperty);
router.put('/properties/:id', adminController.updateProperty);
router.delete('/properties/:id', adminController.deleteProperty);

// Featured Properties Routes
router.put('/properties/:id/featured', adminController.updateFeaturedProperty);
router.put('/settings/featured-properties', adminController.updateFeaturedPropertiesVisibility);

// "Why Choose Us" Routes
router.post('/content/why-choose-us', adminController.addWhyChooseUsItem);
router.put('/content/why-choose-us/:id', adminController.updateWhyChooseUsItem);
router.delete('/content/why-choose-us/:id', adminController.deleteWhyChooseUsItem);

// Testimonials Routes
router.post('/content/testimonials', adminController.addTestimonial);
router.put('/content/testimonials/:id', adminController.updateTestimonial);
router.patch('/content/testimonials/:id/approve', adminController.approveTestimonial);
router.delete('/content/testimonials/:id', adminController.deleteTestimonial);

// Site Settings Routes
router.put('/settings/call-now', adminController.updateCallNowSettings);

module.exports = router;
