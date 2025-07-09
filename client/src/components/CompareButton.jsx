import React, { useState, useEffect } from 'react';

const CompareButton = ({ pg, onCompare }) => {
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    const comparing = JSON.parse(localStorage.getItem('comparePGs') || '[]');
    setIsComparing(comparing.some(item => item.id === pg.id));
  }, [pg.id]);

  const toggleCompare = (e) => {
    e.stopPropagation();
    const comparing = JSON.parse(localStorage.getItem('comparePGs') || '[]');
    
    let newComparing;
    if (isComparing) {
      newComparing = comparing.filter(item => item.id !== pg.id);
    } else {
      if (comparing.length >= 3) {
        alert('You can only compare up to 3 PGs at a time');
        return;
      }
      newComparing = [...comparing, pg];
    }
    
    localStorage.setItem('comparePGs', JSON.stringify(newComparing));
    setIsComparing(!isComparing);
    
    if (onCompare) {
      onCompare(newComparing);
    }
  };

  return (
    <button 
      className={`compare-button ${isComparing ? 'comparing' : ''}`}
      onClick={toggleCompare}
      aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
    >
      <i className="fas fa-balance-scale"></i>
    </button>
  );
};

export default CompareButton;