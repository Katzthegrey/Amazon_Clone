import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = ({ 
  banners = [], 
  autoPlayInterval = 5000,
  height = "400px",
  onBannerClick 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  
  useEffect(() => {
    if (isPlaying && banners.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, autoPlayInterval);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, banners.length, autoPlayInterval]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, autoPlayInterval);
    }
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };
  
  if (banners.length === 0) return null;
  
  const currentBanner = banners[currentSlide];
  
  return (
    <section className="hero-section" style={{ height }}>
      <div 
        className="hero-slide"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${currentBanner.image})`,
          backgroundColor: currentBanner.bgColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">{currentBanner.title}</h1>
          <p className="hero-subtitle">{currentBanner.subtitle}</p>
          <button 
            className="hero-button"
            onClick={() => onBannerClick && onBannerClick(currentBanner)}
          >
            {currentBanner.buttonText} →
          </button>
        </div>
      </div>
      
      {banners.length > 1 && (
        <>
          <button className="hero-arrow hero-arrow-left" onClick={prevSlide}>
            ❮
          </button>
          <button className="hero-arrow hero-arrow-right" onClick={nextSlide}>
            ❯
          </button>
        </>
      )}
      
      {banners.length > 1 && (
        <div className="hero-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
      
      <button 
        className="hero-play-pause"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </section>
  );
};

export default HeroSection;