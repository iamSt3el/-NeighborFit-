import { useState, useEffect, useCallback } from 'react';
import { searchPGs, getSearchStats } from '../services/api';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchParams, setSearchParams] = useState({
    budget: 15000,
    roomType: 'any',
    genderPreference: 'any',
    lifestyle: 'budget',
    area: 'all',
    minScore: 60,
    maxCommuteTime: '45',
    transportMode: 'any',
    nearbyEssentials: 'moderate',
    wifiPriority: 'medium',
    acPriority: 'medium',
    powerPriority: 'high',
    securityPriority: 'high',
    gymPriority: 'low',
    parkingPriority: 'medium',
    foodPreference: 'veg',
    cookingFacility: 'full',
    socialEnvironment: 'moderate',
    noiseTolerance: 'medium',
    enableMatching: true
  });

  // Load initial stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await getSearchStats();
        setStats(statsData.data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    loadStats();
  }, []);

  // Perform search
  const performSearch = useCallback(async (params = searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchPGs(params);
      setSearchResults(result.data || []);
      setSearchParams(params);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Update search parameters
  const updateSearchParams = useCallback((newParams) => {
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);
    return updatedParams;
  }, [searchParams]);

  // Clear results
  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    stats,
    searchParams,
    performSearch,
    updateSearchParams,
    clearResults
  };
};