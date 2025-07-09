import React, { useState } from 'react';

const ImageGallery = ({ images = [], pgName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default placeholder images for when no images are available
  const defaultImages = [
    'https://via.placeholder.com/400x300/3b82f6/ffffff?text=PG+Room+1',
    'https://via.placeholder.com/400x300/10b981/ffffff?text=PG+Room+2',
    'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Common+Area',
    'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Kitchen'
  ];

  const displayImages = (images && images.length > 0) ? images : defaultImages;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <div className="main-image-container">
          <img 
            src={displayImages[currentImageIndex]} 
            alt={`${pgName} - Image ${currentImageIndex + 1}`}
            className="main-image"
            onClick={() => openModal(currentImageIndex)}
          />
          <div className="image-overlay">
            <button className="gallery-nav prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="gallery-nav next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {displayImages.length}
            </div>
          </div>
        </div>
      </div>

      <div className="gallery-thumbnails">
        {displayImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${pgName} - Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={displayImages[currentImageIndex]} 
              alt={`${pgName} - Image ${currentImageIndex + 1}`}
              className="modal-image"
            />
            <button className="modal-nav prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="modal-nav next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;