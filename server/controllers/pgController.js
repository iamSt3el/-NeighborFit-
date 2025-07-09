const PG = require('../models/PG');

const getAllPGs = async (req, res) => {
  try {
    const { page = 1, limit = 20, area } = req.query;
    
    let query = {};
    if (area && area !== 'all') {
      query.area = { $regex: area, $options: 'i' };
    }
    
    const pgs = await PG.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ price: 1 });
    
    const total = await PG.countDocuments(query);
    
    res.json({
      success: true,
      count: pgs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: pgs
    });
    
  } catch (error) {
    console.error('Get PGs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting PGs',
      error: error.message
    });
  }
};

const getPGById = async (req, res) => {
  try {
    const pg = await PG.findOne({ id: req.params.id });
    
    if (!pg) {
      return res.status(404).json({
        success: false,
        message: 'PG not found'
      });
    }
    
    res.json({
      success: true,
      data: pg
    });
    
  } catch (error) {
    console.error('Get PG error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting PG',
      error: error.message
    });
  }
};

const getAreas = async (req, res) => {
  try {
    const areas = await PG.distinct('area');
    
    res.json({
      success: true,
      data: areas.sort()
    });
    
  } catch (error) {
    console.error('Get areas error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting areas',
      error: error.message
    });
  }
};

module.exports = {
  getAllPGs,
  getPGById,
  getAreas
};