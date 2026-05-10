import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailsPage.css';

const ProductDetailPage = ({ products, onAddToCart, isInCart, onProductClick }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct);
    
    if (foundProduct) {
      const related = products.filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [productId, products]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="breadcrumb-detail">
        <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
        <span className="breadcrumb-separator">›</span>
        <button onClick={() => navigate(`/category/${product.category}`)} className="breadcrumb-link">
          {product.category}
        </button>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-info-detail">
          <h1 className="product-title-detail">{product.name}</h1>
          
          <div className="product-rating-detail">
            <div className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="review-count">{product.reviewCount?.toLocaleString()} ratings</span>
          </div>
          
          <div className="product-price-detail">
            <span className="current-price">R{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">R{product.originalPrice.toLocaleString()}</span>
                <span className="discount-badge-detail">-{discount}%</span>
              </>
            )}
          </div>
          
          {product.badge && (
            <div className="product-badge-detail">{product.badge}</div>
          )}
          
          <div className="product-stock-detail">
            {product.inStock ? (
              <span className="in-stock">✓ In Stock</span>
            ) : (
              <span className="out-of-stock">✗ Out of Stock</span>
            )}
          </div>
          
          <div className="product-description-short">
            <p>{product.description}</p>
          </div>
          
          <div className="quantity-selector-detail">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          
          <button className="add-to-cart-detail" onClick={handleAddToCart} disabled={!product.inStock}>
            Add to Cart
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Customers also bought</h3>
          <div className="related-products-grid">
            {relatedProducts.map(related => (
              <div key={related.id} className="related-product-card" onClick={() => navigate(`/product/${related.id}`)}>
                <img src={related.image} alt={related.name} />
                <h4>{related.name}</h4>
                <p>R{related.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;