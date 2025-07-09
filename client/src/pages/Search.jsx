import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import PGList from '../components/PGList';
import { useSearch } from '../hooks/useSearch';

const Search = () => {
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
    <div className="search-page">
      <Header stats={stats} />
      
      <main>
        {/* Search Hero */}
        <section className="search-hero">
          <div className="search-hero-content">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                <i className="fas fa-home"></i>
                Home
              </Link>
              <i className="fas fa-chevron-right"></i>
              <span>Search PGs</span>
            </div>
            <h1>Find Your Perfect PG</h1>
            <p>Use our smart matching algorithm to find PGs that fit your lifestyle and budget</p>
          </div>
        </section>

        {/* Search Section */}
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
            <Link to="/">Home</Link>
            <span>•</span>
            <Link to="/search">Search</Link>
            <span>•</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Search;