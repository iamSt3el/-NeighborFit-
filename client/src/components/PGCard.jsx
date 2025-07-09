import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getScoreColor, getScoreLabel, formatPrice } from '../utils/constants';
import ImageGallery from './ImageGallery';

const PGCard = ({ pg }) => {
  const navigate = useNavigate();
  const scoreColor = getScoreColor(pg.matchScore);
  const scoreLabel = getScoreLabel(pg.matchScore);

  const handleCardClick = () => {
    navigate(`/pg/${pg.id}`);
  };

  return (
    <div className="pg-card" onClick={handleCardClick}>
      
      <div className="pg-header">
        <div className="pg-title">
          <h3>{pg.name}</h3>
          <div className="pg-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{pg.location}</span>
          </div>
        </div>
        <div className="match-score" style={{ backgroundColor: scoreColor }}>
          <span className="score-number">{pg.matchScore}%</span>
          <span className="score-label">{scoreLabel}</span>
        </div>
      </div>

      <div className="pg-content">
        <ImageGallery images={pg.images} pgName={pg.name} />
        
        <div className="pg-details">
          <div className="detail-item">
            <i className="fas fa-rupee-sign"></i>
            <span className="price">{formatPrice(pg.price)}</span>
            <span className="price-period">/month</span>
          </div>
          
          <div className="detail-item">
            <i className="fas fa-bed"></i>
            <span>{pg.occupancyType}</span>
          </div>
          
          <div className="detail-item">
            <i className="fas fa-users"></i>
            <span>{pg.genderPreference}</span>
          </div>
          
          <div className="detail-item">
            <i className="fas fa-building"></i>
            <span>{pg.area}</span>
          </div>

          {pg.contactInfo && (
            <div className="detail-item">
              <i className="fas fa-phone"></i>
              <span>{pg.contactInfo}</span>
            </div>
          )}

          {pg.description && (
            <div className="detail-item description">
              <i className="fas fa-info-circle"></i>
              <span>{pg.description.slice(0, 100)}{pg.description.length > 100 ? '...' : ''}</span>
            </div>
          )}
        </div>

        {pg.amenities && pg.amenities.length > 0 && (
          <div className="amenities">
            <div className="amenities-title">Amenities</div>
            <div className="amenities-list">
              {pg.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGCard;