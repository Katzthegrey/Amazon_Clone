import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, isInCart }) => {
  const [imageError, setImageError] = useState(false);
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  const defaultImage = 'https://via.placeholder.com/300x300?text=No+Image';
  
  return (
    <div className="product-card">
      {product.badge && (
        <div className="product-badge">{product.badge}</div>
      )}
      
      {discount > 0 && (
        <div className="discount-badge">-{discount}%</div>
      )}
      
      <div className="product-image-wrapper">
        <img 
          src={imageError ? defaultImage : product.image} 
          alt={product.name}
          className="product-image"
          onError={() => setImageError(true)}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="review-count">({product.reviewCount?.toLocaleString() || 0})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">R{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original-price">R{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        <div className="product-stock">
          {product.inStock ? (
            <span className="in-stock">✓ In Stock</span>
          ) : (
            <span className="out-of-stock">✗ Out of Stock</span>
          )}
        </div>
        
        <button 
          className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''} ${!product.inStock ? 'disabled' : ''}`}
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          {isInCart ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;