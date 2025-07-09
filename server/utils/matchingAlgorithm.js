/**
 * NeighborFit Matching Algorithm
 * Calculates compatibility score between PG and user preferences
 */

const calculateMatchScore = (pg, preferences) => {
  const {
    budget = 15000,
    roomType = 'any',
    genderPreference = 'any',
    lifestyle = 'budget',
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
    maxCommuteTime = '45',
    transportMode = 'any',
    nearbyEssentials = 'moderate'
  } = preferences;

  let totalScore = 0;
  
  // 1. Budget Score (25% weight)
  const budgetScore = calculateBudgetScore(pg.price, budget);
  totalScore += budgetScore * 0.25;
  
  // 2. Room Type Score (15% weight)
  const roomScore = calculateRoomScore(pg.occupancyType, roomType);
  totalScore += roomScore * 0.15;
  
  // 3. Gender Preference Score (10% weight)
  const genderScore = calculateGenderScore(pg.genderPreference, genderPreference);
  totalScore += genderScore * 0.1;
  
  // 4. Lifestyle Score (15% weight)
  const lifestyleScore = calculateLifestyleScore(pg, lifestyle);
  totalScore += lifestyleScore * 0.15;
  
  // 5. Amenity Priorities Score (25% weight)
  const amenityScore = calculateAmenityScore(pg, {
    wifiPriority,
    acPriority,
    powerPriority,
    securityPriority,
    gymPriority,
    parkingPriority
  });
  totalScore += amenityScore * 0.25;
  
  // 6. Food & Social Score (10% weight)
  const foodSocialScore = calculateFoodSocialScore(pg, {
    foodPreference,
    cookingFacility,
    socialEnvironment,
    noiseTolerance
  });
  totalScore += foodSocialScore * 0.1;
  
  return Math.round(totalScore);
};

const calculateBudgetScore = (pgPrice, userBudget) => {
  const budgetTolerance = 0.2; // 20% flexibility
  const flexibleBudget = userBudget * (1 + budgetTolerance);
  
  if (pgPrice <= userBudget) {
    return 100; // Perfect match
  } else if (pgPrice <= flexibleBudget) {
    // Linear decrease within tolerance
    const excess = pgPrice - userBudget;
    const maxExcess = userBudget * budgetTolerance;
    return Math.max(0, 100 - (excess / maxExcess) * 40);
  } else {
    // Harsh penalty for going over tolerance
    const excess = pgPrice - flexibleBudget;
    return Math.max(0, 20 - (excess / 1000) * 5);
  }
};

const calculateRoomScore = (pgRoom, userPreference) => {
  if (userPreference === 'any') return 100;
  
  const roomMap = {
    'Single': ['single', 'private', '1'],
    'Twin': ['double', 'twin', 'sharing', '2'],
    'Triple': ['triple', 'three', '3'],
    'Quad': ['quad', 'four', '4'],
    'Dormitory': ['dorm', 'dormitory', 'shared']
  };
  
  const userPref = userPreference.toLowerCase();
  const pgRoomLower = pgRoom.toLowerCase();
  
  for (const [pgType, keywords] of Object.entries(roomMap)) {
    if (pgRoomLower.includes(pgType.toLowerCase())) {
      if (keywords.includes(userPref) || userPref === pgType.toLowerCase()) {
        return 100;
      }
    }
  }
  
  return 30; // Partial match
};

const calculateGenderScore = (pgGender, userPreference) => {
  if (userPreference === 'any') return 100;
  
  const pgGenderLower = pgGender.toLowerCase();
  const userPrefLower = userPreference.toLowerCase();
  
  if (pgGenderLower.includes('co-ed') || pgGenderLower.includes('both') || pgGenderLower.includes('mixed')) {
    return userPreference === 'Co-ed' ? 100 : 90; // Co-ed works for everyone but perfect for Co-ed preference
  }
  
  if (
    (userPreference === 'Boys Only' && pgGenderLower.includes('boys')) ||
    (userPreference === 'Girls Only' && pgGenderLower.includes('girls'))
  ) {
    return 100;
  }
  
  return 0; // No match
};

const calculateLifestyleScore = (pg, lifestyle) => {
  const amenities = pg.amenities || [];
  const verificationTags = pg.verificationTags || [];
  
  const lifestyleWeights = {
    'budget': {
      'wifi': 20,
      'food': 15,
      'laundry': 10,
      'power backup': 10,
      'verified': 15
    },
    'comfort': {
      'ac': 25,
      'wifi': 20,
      'housekeeping': 15,
      'security': 15,
      'food': 10
    },
    'location': {
      'metro': 30,
      'transport': 20,
      'restaurants': 15,
      'shopping': 10,
      'connectivity': 15
    },
    'verified': {
      'verified': 40,
      'security': 25,
      'cctv': 15,
      'safety': 10,
      'partner': 10
    }
  };
  
  const weights = lifestyleWeights[lifestyle] || lifestyleWeights['budget'];
  let score = 50; // Base score
  
  // Check amenities
  amenities.forEach(amenity => {
    const amenityLower = amenity.toLowerCase();
    Object.keys(weights).forEach(key => {
      if (amenityLower.includes(key)) {
        score += weights[key];
      }
    });
  });
  
  // Check verification tags
  verificationTags.forEach(tag => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('verified') || tagLower.includes('partner')) {
      score += weights['verified'] || 10;
    }
  });
  
  return Math.min(100, score);
};

const calculateAmenityScore = (pg, amenityPriorities) => {
  const amenities = pg.amenities || [];
  const amenitiesStr = amenities.join(' ').toLowerCase();
  
  const priorityWeights = {
    'low': 1,
    'medium': 2,
    'high': 3
  };
  
  let totalWeight = 0;
  let achievedScore = 0;
  
  // WiFi
  const wifiWeight = priorityWeights[amenityPriorities.wifiPriority];
  totalWeight += wifiWeight;
  if (amenitiesStr.includes('wifi') || amenitiesStr.includes('internet')) {
    achievedScore += wifiWeight;
  }
  
  // AC
  const acWeight = priorityWeights[amenityPriorities.acPriority];
  totalWeight += acWeight;
  if (amenitiesStr.includes('ac') || amenitiesStr.includes('air conditioning') || amenitiesStr.includes('cooling')) {
    achievedScore += acWeight;
  }
  
  // Power Backup
  const powerWeight = priorityWeights[amenityPriorities.powerPriority];
  totalWeight += powerWeight;
  if (amenitiesStr.includes('power backup') || amenitiesStr.includes('generator') || amenitiesStr.includes('ups')) {
    achievedScore += powerWeight;
  }
  
  // Security
  const securityWeight = priorityWeights[amenityPriorities.securityPriority];
  totalWeight += securityWeight;
  if (amenitiesStr.includes('security') || amenitiesStr.includes('cctv') || amenitiesStr.includes('guard')) {
    achievedScore += securityWeight;
  }
  
  // Gym
  const gymWeight = priorityWeights[amenityPriorities.gymPriority];
  totalWeight += gymWeight;
  if (amenitiesStr.includes('gym') || amenitiesStr.includes('fitness') || amenitiesStr.includes('exercise')) {
    achievedScore += gymWeight;
  }
  
  // Parking
  const parkingWeight = priorityWeights[amenityPriorities.parkingPriority];
  totalWeight += parkingWeight;
  if (amenitiesStr.includes('parking') || amenitiesStr.includes('bike parking') || amenitiesStr.includes('car parking')) {
    achievedScore += parkingWeight;
  }
  
  return totalWeight > 0 ? (achievedScore / totalWeight) * 100 : 50;
};

const calculateFoodSocialScore = (pg, preferences) => {
  const amenities = pg.amenities || [];
  const amenitiesStr = amenities.join(' ').toLowerCase();
  let score = 50; // Base score
  
  // Food preference scoring
  if (preferences.foodPreference === 'veg') {
    if (amenitiesStr.includes('veg') || amenitiesStr.includes('vegetarian')) {
      score += 20;
    }
  } else if (preferences.foodPreference === 'nonveg') {
    if (amenitiesStr.includes('non-veg') || amenitiesStr.includes('non vegetarian')) {
      score += 20;
    }
  } else {
    score += 15; // Neutral score for 'any' or 'both'
  }
  
  // Cooking facility scoring
  if (preferences.cookingFacility === 'full') {
    if (amenitiesStr.includes('kitchen') || amenitiesStr.includes('cooking')) {
      score += 15;
    }
  } else if (preferences.cookingFacility === 'basic') {
    if (amenitiesStr.includes('basic kitchen') || amenitiesStr.includes('kitchenette')) {
      score += 15;
    }
  }
  
  // Social environment (based on amenities indicating social spaces)
  if (preferences.socialEnvironment === 'active') {
    if (amenitiesStr.includes('common area') || amenitiesStr.includes('recreation') || amenitiesStr.includes('games')) {
      score += 10;
    }
  } else if (preferences.socialEnvironment === 'quiet') {
    if (amenitiesStr.includes('quiet') || amenitiesStr.includes('peaceful') || amenitiesStr.includes('study area')) {
      score += 10;
    }
  }
  
  return Math.min(100, score);
};

module.exports = {
  calculateMatchScore,
  calculateBudgetScore,
  calculateRoomScore,
  calculateGenderScore,
  calculateLifestyleScore,
  calculateAmenityScore,
  calculateFoodSocialScore
};