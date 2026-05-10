import React, { useState, useRef, useEffect } from 'react';
import './CategoryBar.css';

const CategoryBar = ({ categories, selectedCategory, onCategoryChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="category-bar">
      <div className="category-bar-container">
        {/* Desktop Categories */}
        <div className="categories-desktop">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Mobile Dropdown */}
        <div className="categories-mobile" ref={dropdownRef}>
          <button 
            className="category-dropdown-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="dropdown-icon">☰</span>
            {selectedCategory}
            <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
          </button>
          
          {showDropdown && (
            <div className="category-dropdown-menu">
              {categories.map(category => (
                <button
                  key={category}
                  className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    onCategoryChange(category);
                    setShowDropdown(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;