import React from 'react';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import PGList from '../components/PGList';
import StatsSection from '../components/StatsSection';
import { useSearch } from '../hooks/useSearch';

const Home = () => {
  const {
    searchResults,
    loading,
    error,
    stats,
    searchParams,
    performSearch,
    updateSearchParams
  } = useSearch();

  const handleSearch = (newParams) => {
    updateSearchParams(newParams);
    performSearch(newParams);
  };


  return (
    <div className="app">
      <Header stats={stats} />
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Find Your Perfect PG in Bangalore</h1>
            <p>Smart matching algorithm finds PGs that fit your lifestyle and budget</p>
            <div className="hero-features">
              <div className="feature">
                <i className="fas fa-brain"></i>
                <span>AI-Powered Matching</span>
              </div>
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>Verified Properties</span>
              </div>
              <div className="feature">
                <i className="fas fa-clock"></i>
                <span>Real-time Results</span>
              </div>
            </div>
          </div>
        </section>

        <section className="search-section">
          <div className="search-container">
            <SearchFilters
              searchParams={searchParams}
              onSearch={handleSearch}
              loading={loading}
            />
            
            <PGList
              pgs={searchResults}
              loading={loading}
              error={error}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 NeighborFit. Built for young professionals in Bangalore.</p>
          <div className="footer-links">
            <span>Data sourced from multiple PG platforms</span>
            <span>•</span>
            <span>Smart matching algorithm</span>
            <span>•</span>
            <span>Real-time search</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;