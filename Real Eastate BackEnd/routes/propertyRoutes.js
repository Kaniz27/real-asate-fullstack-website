const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/search', propertyController.searchProperties);
router.get('/locations', propertyController.getLocations);
router.get('/property-types', propertyController.getPropertyTypes);
router.get('/featured', propertyController.getFeaturedProperties);

module.exports = router;
