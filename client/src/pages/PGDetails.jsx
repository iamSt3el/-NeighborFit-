import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPGById } from '../services/api';
import { getScoreColor, getScoreLabel, formatPrice } from '../utils/constants';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageGallery from '../components/ImageGallery';
import FavoriteButton from '../components/FavoriteButton';
import CompareButton from '../components/CompareButton';

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
    <div className="pg-details-page">
      <div className="pg-details-container">
        <div className="pg-details-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i>
            Back to Search
          </button>
          
          <div className="header-actions">
          </div>
        </div>

        <div className="pg-details-content">
          <div className="pg-main-section">
            <div className="pg-images-section">
              <ImageGallery images={pg.images} pgName={pg.name} />
            </div>
            
            <div className="pg-main-info">
              <div className="pg-title-section">
                <h1>{pg.name}</h1>
                {pg.isPremium && (
                  <span className="premium-badge">
                    <i className="fas fa-crown"></i>
                    Premium
                  </span>
                )}
              </div>
              
              <div className="pg-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>{pg.location}, {pg.area}</span>
              </div>
              
              <div className="pg-price">
                <span className="price-amount">{formatPrice(pg.price)}</span>
                <span className="price-period">/month</span>
                {pg.priceDisplay && (
                  <span className="price-display">{pg.priceDisplay}</span>
                )}
              </div>

              <div className="pg-basic-info">
                <div className="basic-info-item">
                  <i className="fas fa-bed"></i>
                  <span>{pg.occupancyType}</span>
                </div>
                <div className="basic-info-item">
                  <i className="fas fa-users"></i>
                  <span>{pg.genderPreference}</span>
                </div>
                {pg.isVerified && (
                  <div className="basic-info-item verified">
                    <i className="fas fa-check-circle"></i>
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="pg-contact-section">
                <button className="contact-button">
                  <i className="fas fa-phone"></i>
                  Contact Owner
                </button>
                <button className="schedule-button">
                  <i className="fas fa-calendar"></i>
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>

          <div className="pg-details-grid">
            {pg.description && (
              <div className="details-section">
                <h3>
                  <i className="fas fa-info-circle"></i>
                  Description
                </h3>
                <p>{pg.description}</p>
              </div>
            )}

            {pg.amenities && pg.amenities.length > 0 && (
              <div className="details-section">
                <h3>
                  <i className="fas fa-star"></i>
                  Amenities
                </h3>
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

            {pg.foodDetails && pg.foodDetails.length > 0 && (
              <div className="details-section">
                <h3>
                  <i className="fas fa-utensils"></i>
                  Food Details
                </h3>
                <div className="food-details">
                  {pg.foodDetails.map((food, index) => (
                    <div key={index} className="food-item">
                      <strong>{food.name}</strong>
                      {food.details && <span>: {food.details}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pg.chargesAndRules && pg.chargesAndRules.length > 0 && (
              <div className="details-section">
                <h3>
                  <i className="fas fa-clipboard-list"></i>
                  Charges & Rules
                </h3>
                <div className="charges-rules">
                  {pg.chargesAndRules.map((rule, index) => (
                    <div key={index} className="rule-item">
                      <strong>{rule.name}</strong>
                      {rule.value && <span>: {rule.value}</span>}
                      {rule.allowed !== undefined && (
                        <span className={`allowed-status ${rule.allowed ? 'allowed' : 'not-allowed'}`}>
                          <i className={`fas ${rule.allowed ? 'fa-check' : 'fa-times'}`}></i>
                          {rule.allowed ? 'Allowed' : 'Not Allowed'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pg.verificationTags && pg.verificationTags.length > 0 && (
              <div className="details-section">
                <h3>
                  <i className="fas fa-shield-alt"></i>
                  Verification
                </h3>
                <div className="verification-tags">
                  {pg.verificationTags.map((tag, index) => (
                    <div key={index} className="verification-tag">
                      <i className="fas fa-check-circle"></i>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetails;