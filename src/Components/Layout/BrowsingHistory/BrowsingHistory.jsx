import React, { useState, useEffect } from 'react';
import './BrowsingHistory.css';

const BrowsingHistory = ({ products, maxItems = 8, onProductClick, onClearHistory }) => {
  const [history, setHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Load browsing history from localStorage
    const savedHistory = localStorage.getItem('browsing_history');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      // Filter to only show products that still exist
      const validHistory = parsedHistory.filter(item => 
        products.some(p => p.id === item.id)
      );
      setHistory(validHistory.slice(0, maxItems));
    }
  }, [products, maxItems]);
  
  const clearHistory = () => {
    localStorage.removeItem('browsing_history');
    setHistory([]);
    if (onClearHistory) onClearHistory();
  };
  
  const removeItem = (productId) => {
    const updatedHistory = history.filter(item => item.id !== productId);
    setHistory(updatedHistory);
    localStorage.setItem('browsing_history', JSON.stringify(updatedHistory));
  };
  
  if (!isVisible || history.length === 0) return null;
  
  return (
    <div className="browsing-history">
      <div className="history-header">
        <div className="header-content">
          <span className="history-icon">🕒</span>
          <h3 className="history-title">Your Browsing History</h3>
          <span className="history-count">{history.length} items</span>
        </div>
        <div className="header-actions">
          <button 
            className="clear-history-btn"
            onClick={clearHistory}
          >
            Clear All
          </button>
          <button 
            className="close-history-btn"
            onClick={() => setIsVisible(false)}
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="history-grid">
        {history.map(product => (
          <div 
            key={product.id} 
            className="history-item"
            onClick={() => onProductClick && onProductClick(product)}
          >
            <div className="history-item-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name} 
                className="history-item-image"
              />
              <button 
                className="remove-history-item"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(product.id);
                }}
              >
                ✕
              </button>
            </div>
            <div className="history-item-info">
              <p className="history-item-name">{product.name}</p>
              <p className="history-item-price">R{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Restore button if history was closed */}
      {!isVisible && history.length > 0 && (
        <button 
          className="restore-history-btn"
          onClick={() => setIsVisible(true)}
        >
          Show Browsing History
        </button>
      )}
    </div>
  );
};

// Utility function to add product to browsing history
export const addToBrowsingHistory = (product) => {
  const savedHistory = localStorage.getItem('browsing_history');
  let history = savedHistory ? JSON.parse(savedHistory) : [];
  
  // Remove if already exists
  history = history.filter(item => item.id !== product.id);
  
  // Add to beginning
  history.unshift({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    viewedAt: new Date().toISOString()
  });
  
  // Keep only last 20 items
  history = history.slice(0, 20);
  
  localStorage.setItem('browsing_history', JSON.stringify(history));
};

export default BrowsingHistory;