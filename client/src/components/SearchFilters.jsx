import React, { useState, useEffect } from 'react';
import { 
  ROOM_TYPES, 
  GENDER_PREFERENCES, 
  LIFESTYLE_PREFERENCES, 
  AREAS, 
  BUDGET_RANGE,
  COMMUTE_PREFERENCES,
  TRANSPORT_MODES,
  NEARBY_ESSENTIALS,
  AMENITY_PRIORITIES,
  FOOD_PREFERENCES,
  COOKING_FACILITIES,
  SOCIAL_ENVIRONMENTS,
  NOISE_TOLERANCE
} from '../utils/constants';

const SearchFilters = ({ searchParams, onSearch, loading }) => {
  const [filters, setFilters] = useState(searchParams);

  useEffect(() => {
    setFilters(searchParams);
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    handleFilterChange('budget', value);
  };

  return (
    <div className="search-filters">
      <div className="filters-container">
        <h3><i className="fas fa-brain"></i> Smart Matching Preferences</h3>
        <p className="subtitle">Set your priorities to get personalized match scores for each PG</p>
        
        <div className="preferences-grid">
          {/* Basic Preferences */}
          <div className="preference-section">
            <h4><i className="fas fa-sliders-h"></i> Basic Preferences</h4>
          <div className="filter-group">
            <label htmlFor="budget">
              <i className="fas fa-rupee-sign"></i>
              Your Ideal Budget: ₹{filters.budget?.toLocaleString()}/month
            </label>
            <input
              id="budget"
              type="range"
              min={BUDGET_RANGE.min}
              max={BUDGET_RANGE.max}
              step={BUDGET_RANGE.step}
              value={filters.budget}
              onChange={handleBudgetChange}
              className="budget-slider"
            />
            <div className="budget-range">
              <span>₹{BUDGET_RANGE.min.toLocaleString()}</span>
              <span>₹{BUDGET_RANGE.max.toLocaleString()}</span>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="roomType">
                <i className="fas fa-bed"></i>
                Preferred Room Type
              </label>
              <select
                id="roomType"
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
              >
                {ROOM_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="genderPreference">
                <i className="fas fa-users"></i>
                Gender Preference
              </label>
              <select
                id="genderPreference"
                value={filters.genderPreference}
                onChange={(e) => handleFilterChange('genderPreference', e.target.value)}
              >
                {GENDER_PREFERENCES.map(pref => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="lifestyle">
                <i className="fas fa-star"></i>
                Lifestyle Priority
              </label>
              <select
                id="lifestyle"
                value={filters.lifestyle}
                onChange={(e) => handleFilterChange('lifestyle', e.target.value)}
              >
                {LIFESTYLE_PREFERENCES.map(pref => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="area">
                <i className="fas fa-building"></i>
                Preferred Area
              </label>
              <select
                id="area"
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
              >
                {AREAS.map(area => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          </div>

          {/* Location & Commute Preferences */}
          <div className="preference-section">
            <h4><i className="fas fa-map-marker-alt"></i> Location & Commute</h4>
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="maxCommuteTime">
                <i className="fas fa-clock"></i>
                Max Commute Time
              </label>
              <select
                id="maxCommuteTime"
                value={filters.maxCommuteTime || '45'}
                onChange={(e) => handleFilterChange('maxCommuteTime', e.target.value)}
              >
                {COMMUTE_PREFERENCES.map(pref => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="transportMode">
                <i className="fas fa-subway"></i>
                Transportation Preference
              </label>
              <select
                id="transportMode"
                value={filters.transportMode || 'any'}
                onChange={(e) => handleFilterChange('transportMode', e.target.value)}
              >
                {TRANSPORT_MODES.map(mode => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="nearbyEssentials">
              <i className="fas fa-shopping-cart"></i>
              Nearby Essentials
            </label>
            <select
              id="nearbyEssentials"
              value={filters.nearbyEssentials || 'moderate'}
              onChange={(e) => handleFilterChange('nearbyEssentials', e.target.value)}
            >
              {NEARBY_ESSENTIALS.map(essential => (
                <option key={essential.value} value={essential.value}>
                  {essential.label}
                </option>
              ))}
            </select>
          </div>
          </div>

          {/* Amenity Priorities */}
          <div className="preference-section">
            <h4><i className="fas fa-wifi"></i> Amenity Priorities</h4>
          <div className="amenity-grid">
            <div className="amenity-priority">
              <label>WiFi Quality</label>
              <select
                value={filters.wifiPriority || 'medium'}
                onChange={(e) => handleFilterChange('wifiPriority', e.target.value)}
              >
                {AMENITY_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="amenity-priority">
              <label>AC/Cooling</label>
              <select
                value={filters.acPriority || 'medium'}
                onChange={(e) => handleFilterChange('acPriority', e.target.value)}
              >
                {AMENITY_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="amenity-priority">
              <label>Power Backup</label>
              <select
                value={filters.powerPriority || 'high'}
                onChange={(e) => handleFilterChange('powerPriority', e.target.value)}
              >
                {AMENITY_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="amenity-priority">
              <label>Security</label>
              <select
                value={filters.securityPriority || 'high'}
                onChange={(e) => handleFilterChange('securityPriority', e.target.value)}
              >
                {AMENITY_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="amenity-priority">
              <label>Gym/Fitness</label>
              <select
                value={filters.gymPriority || 'low'}
                onChange={(e) => handleFilterChange('gymPriority', e.target.value)}
              >
                {AMENITY_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="amenity-priority">
              <label>Parking</label>
              <select
                value={filters.parkingPriority || 'medium'}
                onChange={(e) => handleFilterChange('parkingPriority', e.target.value)}
              >
                {AMENITY_PRIORITIES.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          </div>

          {/* Food & Social Preferences */}
          <div className="preference-section">
            <h4><i className="fas fa-utensils"></i> Food & Social</h4>
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="foodPreference">
                <i className="fas fa-utensils"></i>
                Food Preference
              </label>
              <select
                id="foodPreference"
                value={filters.foodPreference || 'veg'}
                onChange={(e) => handleFilterChange('foodPreference', e.target.value)}
              >
                {FOOD_PREFERENCES.map(pref => (
                  <option key={pref.value} value={pref.value}>
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="cookingFacility">
                <i className="fas fa-home"></i>
                Cooking Facility
              </label>
              <select
                id="cookingFacility"
                value={filters.cookingFacility || 'full'}
                onChange={(e) => handleFilterChange('cookingFacility', e.target.value)}
              >
                {COOKING_FACILITIES.map(facility => (
                  <option key={facility.value} value={facility.value}>
                    {facility.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="socialEnvironment">
                <i className="fas fa-user-friends"></i>
                Social Environment
              </label>
              <select
                id="socialEnvironment"
                value={filters.socialEnvironment || 'moderate'}
                onChange={(e) => handleFilterChange('socialEnvironment', e.target.value)}
              >
                {SOCIAL_ENVIRONMENTS.map(env => (
                  <option key={env.value} value={env.value}>
                    {env.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="noiseTolerance">
                <i className="fas fa-moon"></i>
                Noise Tolerance
              </label>
              <select
                id="noiseTolerance"
                value={filters.noiseTolerance || 'medium'}
                onChange={(e) => handleFilterChange('noiseTolerance', e.target.value)}
              >
                {NOISE_TOLERANCE.map(tolerance => (
                  <option key={tolerance.value} value={tolerance.value}>
                    {tolerance.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="minScore">
            Minimum Match Score: {filters.minScore}%
          </label>
          <input
            id="minScore"
            type="range"
            min="0"
            max="100"
            step="5"
            value={filters.minScore}
            onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value))}
            className="score-slider"
          />
        </div>

        <div className="matching-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.enableMatching !== false}
              onChange={(e) => handleFilterChange('enableMatching', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <span>Enable Smart Matching</span>
        </div>

        <button 
          className="search-button" 
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Searching...
            </>
          ) : (
            <>
              <i className="fas fa-search"></i>
              Find PGs
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;