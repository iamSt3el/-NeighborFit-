import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-title">
          <div className="skeleton-line skeleton-line-lg"></div>
          <div className="skeleton-line skeleton-line-sm"></div>
        </div>
        <div className="skeleton-score"></div>
      </div>
      
      <div className="skeleton-content">
        <div className="skeleton-details">
          <div className="skeleton-line skeleton-line-md"></div>
          <div className="skeleton-line skeleton-line-sm"></div>
          <div className="skeleton-line skeleton-line-md"></div>
          <div className="skeleton-line skeleton-line-lg"></div>
        </div>
        
        <div className="skeleton-amenities">
          <div className="skeleton-line skeleton-line-sm"></div>
          <div className="skeleton-tags">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;