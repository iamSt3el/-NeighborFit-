const { body, validationResult } = require('express-validator');

const validateSearchRequest = [
  body('budget')
    .optional()
    .isNumeric()
    .withMessage('Budget must be a number')
    .isInt({ min: 5000, max: 50000 })
    .withMessage('Budget must be between 5000 and 50000'),
  
  body('roomType')
    .optional()
    .isIn(['any', 'Single', 'Twin', 'Triple', 'Quad', 'Dormitory'])
    .withMessage('Invalid room type'),
  
  body('genderPreference')
    .optional()
    .isIn(['any', 'Boys Only', 'Girls Only', 'Co-ed'])
    .withMessage('Invalid gender preference'),
  
  body('lifestyle')
    .optional()
    .isIn(['budget', 'comfort', 'location', 'verified'])
    .withMessage('Invalid lifestyle preference'),
  
  body('minScore')
    .optional()
    .isNumeric()
    .withMessage('Minimum score must be a number')
    .isInt({ min: 0, max: 100 })
    .withMessage('Minimum score must be between 0 and 100'),
  
  body('limit')
    .optional()
    .isNumeric()
    .withMessage('Limit must be a number')
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  body('maxCommuteTime')
    .optional()
    .isIn(['30', '45', '60', '90'])
    .withMessage('Invalid commute time'),
  
  body('transportMode')
    .optional()
    .isIn(['any', 'metro', 'bus', 'bike', 'walking'])
    .withMessage('Invalid transport mode'),
  
  body('nearbyEssentials')
    .optional()
    .isIn(['basic', 'moderate', 'extensive'])
    .withMessage('Invalid nearby essentials preference'),
  
  body('wifiPriority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid WiFi priority'),
  
  body('acPriority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid AC priority'),
  
  body('powerPriority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid power backup priority'),
  
  body('securityPriority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid security priority'),
  
  body('gymPriority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid gym priority'),
  
  body('parkingPriority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid parking priority'),
  
  body('foodPreference')
    .optional()
    .isIn(['any', 'veg', 'nonveg', 'both'])
    .withMessage('Invalid food preference'),
  
  body('cookingFacility')
    .optional()
    .isIn(['not_needed', 'basic', 'full'])
    .withMessage('Invalid cooking facility preference'),
  
  body('socialEnvironment')
    .optional()
    .isIn(['quiet', 'moderate', 'active'])
    .withMessage('Invalid social environment preference'),
  
  body('noiseTolerance')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid noise tolerance'),
  
  body('enableMatching')
    .optional()
    .isBoolean()
    .withMessage('Enable matching must be a boolean'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateSearchRequest
};