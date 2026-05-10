import React, { useRef, useState } from 'react';
import './HeroBannerCards.css';

const HeroBannerCards = ({ banners }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="hero-banner-cards">
      {showLeftArrow && (
        <button className="scroll-arrow left" onClick={() => scroll('left')}>
          ❮
        </button>
      )}
      
      <div 
        className="banner-cards-container" 
        ref={scrollContainerRef}
        onScroll={checkScroll}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="promo-card">
            <div className="promo-card-content">
              <span className="promo-badge">{banner.badge}</span>
              <h3 className="promo-title">{banner.title}</h3>
              <p className="promo-description">{banner.description}</p>
              <button className="promo-button">
                {banner.buttonText} →
              </button>
            </div>
            <div className="promo-card-image">
              <img src={banner.image} alt={banner.title} />
            </div>
          </div>
        ))}
      </div>
      
      {showRightArrow && (
        <button className="scroll-arrow right" onClick={() => scroll('right')}>
          ❯
        </button>
      )}
    </div>
  );
};

export default HeroBannerCards;