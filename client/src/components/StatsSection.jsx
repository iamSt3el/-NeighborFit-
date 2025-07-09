import React from 'react';
import { formatPrice } from '../utils/constants';

const StatsSection = ({ stats }) => {
  if (!stats) return null;

  return (
    <section className="stats-section">
      <div className="stats-container">
        <h2>Market Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalPGs}</div>
              <div className="stat-label">Total PGs</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{formatPrice(stats.avgPrice)}</div>
              <div className="stat-label">Average Rent</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.areas}</div>
              <div className="stat-label">Areas Covered</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">
                {formatPrice(stats.priceRange?.minPrice)} - {formatPrice(stats.priceRange?.maxPrice)}
              </div>
              <div className="stat-label">Price Range</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;