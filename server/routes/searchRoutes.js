const express = require('express');
const { searchPGs, getSearchStats } = require('../controllers/searchController');
const { validateSearchRequest } = require('../middleware/validation');

const router = express.Router();

// POST /api/search - Search PGs with scoring
router.post('/', validateSearchRequest, searchPGs);

// GET /api/search/stats - Get search statistics
router.get('/stats', getSearchStats);

module.exports = router;