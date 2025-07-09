import React from 'react';

const Header = ({ stats }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1 className="logo">
            <i className="fas fa-building"></i> NeighborFit
          </h1>
          <p className="tagline">Smart PG Matching for Young Professionals</p>
        </div>
        <div className="nav-stats">
          <span className="stat-item">
            <i className="fas fa-home"></i>
            <span>{stats?.totalPGs || 0}</span> PGs
          </span>
          <span className="stat-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{stats?.areas || 0}</span> Areas
          </span>
          <span className="stat-item">
            <i className="fas fa-rupee-sign"></i>
            <span>₹{stats?.avgPrice || 0}</span> Avg
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;