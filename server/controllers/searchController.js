const PG = require('../models/PG');
const { calculateMatchScore } = require('../utils/matchingAlgorithm');

const searchPGs = async (req, res) => {
  try {
    const {
      budget = 15000,
      roomType = 'any',
      genderPreference = 'any',
      lifestyle = 'budget',
      area = 'all',
      minScore = 60,
      limit = 50,
      maxCommuteTime = '45',
      transportMode = 'any',
      nearbyEssentials = 'moderate',
      wifiPriority = 'medium',
      acPriority = 'medium',
      powerPriority = 'high',
      securityPriority = 'high',
      gymPriority = 'low',
      parkingPriority = 'medium',
      foodPreference = 'veg',
      cookingFacility = 'full',
      socialEnvironment = 'moderate',
      noiseTolerance = 'medium',
      enableMatching = true
    } = req.body;

    // Build MongoDB query
    let query = {};
    
    if (area !== 'all') {
      query.area = { $regex: area, $options: 'i' };
    }
    
    if (genderPreference !== 'any') {
      if (genderPreference === 'Boys Only') {
        query.genderPreference = { $regex: 'boys|male|men', $options: 'i' };
      } else if (genderPreference === 'Girls Only') {
        query.genderPreference = { $regex: 'girls|female|women', $options: 'i' };
      } else if (genderPreference === 'Co-ed') {
        query.genderPreference = { $regex: 'co-ed|both|mixed', $options: 'i' };
      }
    }

    // Get PGs from database
    const pgs = await PG.find(query).lean();
    
    // Calculate match scores only if matching is enabled
    const scoredPGs = pgs.map(pg => ({
      ...pg,
      matchScore: enableMatching ? calculateMatchScore(pg, req.body) : 75
    }));
    
    // Filter by minimum score and sort
    const filteredPGs = scoredPGs
      .filter(pg => enableMatching ? pg.matchScore >= minScore : true)
      .sort((a, b) => enableMatching ? b.matchScore - a.matchScore : 0)
      .slice(0, limit);
    
    res.json({
      success: true,
      count: filteredPGs.length,
      totalFound: scoredPGs.length,
      data: filteredPGs
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during search',
      error: error.message
    });
  }
};

const getSearchStats = async (req, res) => {
  try {
    const totalPGs = await PG.countDocuments();
    const areas = await PG.distinct('area');
    const avgPrice = await PG.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);
    
    const priceRange = await PG.aggregate([
      { $group: { 
          _id: null, 
          minPrice: { $min: '$price' }, 
          maxPrice: { $max: '$price' } 
        } 
      }
    ]);
    
    res.json({
      success: true,
      data: {
        totalPGs,
        areas: areas.length,
        areasList: areas,
        avgPrice: Math.round(avgPrice[0]?.avgPrice || 0),
        priceRange: priceRange[0] || { minPrice: 0, maxPrice: 0 }
      }
    });
    
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting stats',
      error: error.message
    });
  }
};

module.exports = {
  searchPGs,
  getSearchStats
};