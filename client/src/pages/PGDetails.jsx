import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPGById } from '../services/api';
import { getScoreColor, getScoreLabel, formatPrice } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPG] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        setLoading(true);
        const response = await getPGById(id);
        setPG(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPGDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="pg-details-container">
        <LoadingSpinner size="large" message="Loading PG details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pg-details-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle fa-3x"></i>
          <h3>Unable to load PG details</h3>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="pg-details-container">
        <div className="error-state">
          <i className="fas fa-home fa-3x"></i>
          <h3>PG not found</h3>
          <p>The PG you're looking for doesn't exist or may have been removed.</p>
          <button onClick={() => navigate('/')}>
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const scoreColor = getScoreColor(pg.matchScore || 0);
  const scoreLabel = getScoreLabel(pg.matchScore || 0);

  return (
    <div className="pg-details-container">
      <div className="pg-details-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left"></i>
          Back to Search
        </button>
        
        {pg.matchScore && (
          <div className="match-score-large" style={{ backgroundColor: scoreColor }}>
            <span className="score-number">{pg.matchScore}%</span>
            <span className="score-label">{scoreLabel}</span>
          </div>
        )}
      </div>

      <div className="pg-details-content">
        <div className="pg-main-info">
          <h1>{pg.name}</h1>
          <div className="pg-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{pg.location}, {pg.area}</span>
          </div>
          <div className="pg-price">
            <span className="price-amount">{formatPrice(pg.price)}</span>
            <span className="price-period">/month</span>
          </div>
        </div>

        <div className="pg-details-grid">
          <div className="pg-info-section">
            <h3>Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <i className="fas fa-bed"></i>
                <span>Room Type: {pg.occupancyType}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-users"></i>
                <span>Gender: {pg.genderPreference}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-building"></i>
                <span>Area: {pg.area}</span>
              </div>
              {pg.contactInfo && (
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <span>{pg.contactInfo}</span>
                </div>
              )}
            </div>
          </div>

          {pg.description && (
            <div className="pg-description-section">
              <h3>Description</h3>
              <p>{pg.description}</p>
            </div>
          )}

          {pg.amenities && pg.amenities.length > 0 && (
            <div className="pg-amenities-section">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {pg.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <i className="fas fa-check"></i>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pg.verificationTags && pg.verificationTags.length > 0 && (
            <div className="pg-verification-section">
              <h3>Verification</h3>
              <div className="verification-list">
                {pg.verificationTags.map((tag, index) => (
                  <div key={index} className="verification-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pg-actions">
          <button className="primary-button">
            <i className="fas fa-phone"></i>
            Contact Owner
          </button>
          <button className="secondary-button">
            <i className="fas fa-heart"></i>
            Save PG
          </button>
          <button className="secondary-button">
            <i className="fas fa-share"></i>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;