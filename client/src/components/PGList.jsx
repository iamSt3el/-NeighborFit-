import React from 'react';
import PGCard from './PGCard';
import SkeletonCard from './SkeletonCard';

const PGList = ({ pgs, loading, error }) => {

  if (loading) {
    return (
      <div className="pg-list-container">
        <div className="results-header">
          <h2>
            <i className="fas fa-search"></i>
            Searching for your perfect PG...
          </h2>
        </div>
        <div className="pg-grid">
          {Array(6).fill(0).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pg-list-container">
        <div className="error-state">
          <i className="fas fa-exclamation-triangle fa-3x"></i>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!pgs || pgs.length === 0) {
    return (
      <div className="pg-list-container">
        <div className="empty-state">
          <i className="fas fa-search fa-3x"></i>
          <h3>No PGs found</h3>
          <p>Try adjusting your search criteria or minimum match score</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg-list-container">
      <div className="results-header">
        <h2>
          <i className="fas fa-home"></i>
          Found {pgs.length} PG{pgs.length !== 1 ? 's' : ''} for you
        </h2>
        <p>Results sorted by match score</p>
      </div>
      
      <div className="pg-grid">
        {pgs.map((pg) => (
          <PGCard 
            key={pg.id || pg._id} 
            pg={pg}
          />
        ))}
      </div>
    </div>
  );
};

export default PGList;