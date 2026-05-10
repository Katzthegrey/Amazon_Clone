import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryMultiCard.css';

const CategoryMultiCard = ({ categories, onItemClick, onViewAllClick }) => {
  const navigate = useNavigate();

  const handleItemClick = (item, category) => {
    if (onItemClick) {
      onItemClick(item, category);
    } else if (item.link) {
      navigate(item.link);
    } else if (item.subcategory) {
      navigate(`/category/${encodeURIComponent(item.subcategory)}`);
    } else {
      navigate(`/category/${encodeURIComponent(item.name)}`);
    }
  };

  const handleViewAll = (category) => {
    if (onViewAllClick) {
      onViewAllClick(category);
    } else if (category.link) {
      navigate(category.link);
    } else {
      navigate(`/category/${encodeURIComponent(category.title)}`);
    }
  };

  return (
    <div className="category-multi-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-multi-card">
          <div className="category-card-header">
            <h3 className="category-card-title">{category.title}</h3>
            <span className="category-card-subtitle">{category.subtitle}</span>
          </div>
          
          <div className="category-items-grid">
            {category.items.map((item, index) => (
              <div 
                key={index} 
                className="category-item"
                onClick={() => handleItemClick(item, category)}
              >
                <img src={item.image} alt={item.name} className="category-item-image" />
                <span className="category-item-name">{item.name}</span>
                {item.count && <span className="category-item-count">{item.count} items</span>}
              </div>
            ))}
          </div>
          
          <button 
            className="category-card-link"
            onClick={() => handleViewAll(category)}
          >
            See more →
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryMultiCard;