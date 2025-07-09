const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserPreferences,
  addToFavorites,
  removeFromFavorites
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Please enter a valid 10-digit phone number'),
  body('profession')
    .isIn(['student', 'software-engineer', 'marketing', 'finance', 'consultant', 'designer', 'other'])
    .withMessage('Please select a valid profession')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/preferences', authMiddleware, updateUserPreferences);
router.post('/favorites', authMiddleware, addToFavorites);
router.delete('/favorites/:pgId', authMiddleware, removeFromFavorites);

module.exports = router;