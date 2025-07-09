import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const FavoriteButton = ({ pgId, onToggle }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getStoredUser();
      setIsFavorited(user?.favorites?.includes(pgId) || false);
    }
  }, [pgId]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    
    if (!authService.isAuthenticated()) {
      alert('Please login to save favorites');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isFavorited) {
        await authService.removeFromFavorites(pgId);
      } else {
        await authService.addToFavorites(pgId);
      }
      
      setIsFavorited(!isFavorited);
      
      if (onToggle) {
        onToggle(pgId, !isFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      className={`favorite-button ${isFavorited ? 'favorited' : ''} ${loading ? 'loading' : ''}`}
      onClick={toggleFavorite}
      disabled={loading}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <i className={`${isFavorited ? 'fas' : 'far'} fa-heart`}></i>
      )}
    </button>
  );
};

export default FavoriteButton;