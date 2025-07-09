const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceDisplay: {
    type: String,
    required: true
  },
  occupancyType: {
    type: String,
    required: true
  },
  genderPreference: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String
  },
  verificationTags: [{
    type: String
  }],
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

// Create index for location-based queries
pgSchema.index({ area: 1, price: 1 });
pgSchema.index({ genderPreference: 1, occupancyType: 1 });

module.exports = mongoose.model('PG', pgSchema);