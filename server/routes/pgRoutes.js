const express = require('express');
const { getAllPGs, getPGById, getAreas } = require('../controllers/pgController');

const router = express.Router();

// GET /api/pgs - Get all PGs with pagination
router.get('/', getAllPGs);

// GET /api/pgs/areas - Get available areas
router.get('/areas', getAreas);

// GET /api/pgs/:id - Get specific PG by ID
router.get('/:id', getPGById);

module.exports = router;