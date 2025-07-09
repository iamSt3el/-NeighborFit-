export const ROOM_TYPES = [
  { value: 'any', label: 'Any Room Type' },
  { value: 'Single', label: 'Single Room' },
  { value: 'Twin', label: 'Twin Sharing' },
  { value: 'Triple', label: 'Triple Sharing' },
  { value: 'Quad', label: 'Quad Sharing' },
  { value: 'Dormitory', label: 'Dormitory' }
];

export const GENDER_PREFERENCES = [
  { value: 'any', label: 'No Strong Preference' },
  { value: 'Girls Only', label: 'Girls Only' },
  { value: 'Boys Only', label: 'Boys Only' },
  { value: 'Co-ed', label: 'Co-ed' }
];

export const LIFESTYLE_PREFERENCES = [
  { value: 'budget', label: 'Budget-Friendly' },
  { value: 'comfort', label: 'Comfort & Amenities' },
  { value: 'location', label: 'Prime Location' },
  { value: 'verified', label: 'Verified & Safe' }
];

export const AREAS = [
  { value: 'all', label: 'All Areas' },
  { value: 'Koramangala', label: 'Koramangala' },
  { value: 'Indiranagar', label: 'Indiranagar' },
  { value: 'Rajarajeshwari Nagar', label: 'Rajarajeshwari Nagar' }
];

export const BUDGET_RANGE = {
  min: 5000,
  max: 30000,
  step: 1000
};

export const SCORE_COLORS = {
  excellent: '#10B981', // Green for 80%+
  good: '#F59E0B',      // Yellow for 60-79%
  fair: '#6B7280'       // Gray for <60%
};

export const SCORE_LABELS = {
  excellent: 'Excellent Match',
  good: 'Good Match',
  fair: 'Fair Match'
};

export const getScoreColor = (score) => {
  if (score >= 80) return SCORE_COLORS.excellent;
  if (score >= 60) return SCORE_COLORS.good;
  return SCORE_COLORS.fair;
};

export const getScoreLabel = (score) => {
  if (score >= 80) return SCORE_LABELS.excellent;
  if (score >= 60) return SCORE_LABELS.good;
  return SCORE_LABELS.fair;
};

// Additional preferences from HTML website
export const COMMUTE_PREFERENCES = [
  { value: '30', label: 'Within 30 minutes' },
  { value: '45', label: 'Within 45 minutes' },
  { value: '60', label: 'Within 1 hour' },
  { value: '90', label: 'No preference' }
];

export const TRANSPORT_MODES = [
  { value: 'any', label: 'Any mode' },
  { value: 'metro', label: 'Near metro station' },
  { value: 'bus', label: 'Good bus connectivity' },
  { value: 'bike', label: 'Bike-friendly area' },
  { value: 'walking', label: 'Walking distance to work' }
];

export const NEARBY_ESSENTIALS = [
  { value: 'basic', label: 'Basic needs only' },
  { value: 'moderate', label: 'Shops & restaurants' },
  { value: 'extensive', label: 'Malls & entertainment' }
];

export const AMENITY_PRIORITIES = [
  { value: 'low', label: 'Not important' },
  { value: 'medium', label: 'Moderately important' },
  { value: 'high', label: 'Very important' }
];

export const FOOD_PREFERENCES = [
  { value: 'any', label: 'Any food type' },
  { value: 'veg', label: 'Vegetarian preferred' },
  { value: 'nonveg', label: 'Non-veg welcome' },
  { value: 'both', label: 'Both equally fine' }
];

export const COOKING_FACILITIES = [
  { value: 'not_needed', label: 'Not needed' },
  { value: 'basic', label: 'Basic kitchen access' },
  { value: 'full', label: 'Full cooking facility' }
];

export const SOCIAL_ENVIRONMENTS = [
  { value: 'quiet', label: 'Quiet & peaceful' },
  { value: 'moderate', label: 'Balanced social life' },
  { value: 'active', label: 'Active & social' }
];

export const NOISE_TOLERANCE = [
  { value: 'low', label: 'Very quiet needed' },
  { value: 'medium', label: 'Moderate noise OK' },
  { value: 'high', label: 'Noise doesn\'t bother' }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceShort = (price) => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  }
  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }
  return `₹${price}`;
};