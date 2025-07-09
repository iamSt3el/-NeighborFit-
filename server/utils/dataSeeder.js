const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const PG = require('../models/PG');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await PG.deleteMany({});
    console.log('Cleared existing PG data');
    
    // Read JSON data
    const dataPath = path.join(__dirname, '../data/consolidated_pgs.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`Found ${jsonData.length} PGs to seed`);
    
    // Process and insert data
    let successCount = 0;
    let errorCount = 0;
    
    for (const pg of jsonData) {
      try {
        // Clean and validate data
        const cleanedPG = {
          id: pg.id || `pg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: pg.name || 'Unknown PG',
          area: pg.area || 'Unknown',
          location: pg.location || 'Unknown',
          price: parseFloat(pg.price) || 0,
          priceDisplay: pg.priceDisplay || `₹${pg.price}`,
          occupancyType: pg.occupancyType || 'Unknown',
          genderPreference: pg.genderPreference || 'Unknown',
          description: pg.description || 'No description available',
          contactInfo: pg.contactInfo || '',
          verificationTags: pg.verificationTags || [],
          amenities: pg.amenities || [],
          images: pg.images || [],
          coordinates: pg.coordinates || {}
        };
        
        await PG.create(cleanedPG);
        successCount++;
        
      } catch (error) {
        console.error(`Error seeding PG ${pg.id || 'unknown'}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\nSeeding completed:`);
    console.log(`Successfully seeded: ${successCount} PGs`);
    console.log(`Errors: ${errorCount} PGs`);
    
    // Show summary stats
    const stats = await PG.aggregate([
      {
        $group: {
          _id: null,
          totalPGs: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          areas: { $addToSet: '$area' }
        }
      }
    ]);
    
    if (stats.length > 0) {
      console.log(`\nDatabase Summary:`);
      console.log(`Total PGs: ${stats[0].totalPGs}`);
      console.log(`Average Price: ₹${Math.round(stats[0].avgPrice)}`);
      console.log(`Price Range: ₹${stats[0].minPrice} - ₹${stats[0].maxPrice}`);
      console.log(`Areas: ${stats[0].areas.join(', ')}`);
    }
    
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;