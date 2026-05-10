import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cartItems, updateQuantity, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const estimatedTax = subtotal * 0.15; 
  const deliveryFee = subtotal > 500 ? 0 : 99.99;
  const total = subtotal + estimatedTax + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      alert('This is a demo. Checkout functionality coming soon!');
    }, 1500);
  };

  // Empty Cart State - Amazon Style
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty-container">
          {/* Left Column - Empty Cart Message */}
          <div className="cart-empty-left">
            <div className="cart-empty-box">
              <div className="cart-empty-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h1>Your Amazon Cart is empty</h1>
              
              <div className="cart-empty-message">
                <p>Your shopping cart is waiting for you. Give it purpose – fill it with books, electronics, fashion, and more from across South Africa.</p>
                <p>Have an account? <button className="sign-in-link" onClick={() => navigate('/login')}>Sign in</button> to see your saved items.</p>
              </div>
              
              <div className="cart-empty-actions">
                <button className="shop-now-btn-empty" onClick={() => navigate('/')}>
                  <i className="fas fa-arrow-left"></i> Continue Shopping
                </button>
                
                <div className="empty-cart-help">
                  <h4>Have a gift card or promo code?</h4>
                  <p>Enter it on the next step when you check out.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations (Amazon Style) */}
          <div className="cart-empty-right">
            <div className="empty-cart-recommendations">
              <div className="recommendation-header">
                <h3>Your saved items</h3>
                <Link to="/">See all</Link>
              </div>
              <p className="recommendation-subtitle">
                Sign in to view items you previously saved or added to your cart.
              </p>
              
              <button className="sign-in-recommendation" onClick={() => navigate('/login')}>
                <i className="fas fa-user-circle"></i> Sign in to see saved items
              </button>
            </div>

            <div className="empty-cart-favorites">
              <h4>Shop popular categories</h4>
              <div className="popular-categories">
                <div className="category-chip" onClick={() => navigate('/category/Electronics')}>
                  <i className="fas fa-mobile-alt"></i> Electronics
                </div>
                <div className="category-chip" onClick={() => navigate('/category/Fashion')}>
                  <i className="fas fa-tshirt"></i> Fashion
                </div>
                <div className="category-chip" onClick={() => navigate('/category/Books')}>
                  <i className="fas fa-book"></i> Books
                </div>
                <div className="category-chip" onClick={() => navigate('/category/Home & Kitchen')}>
                  <i className="fas fa-home"></i> Home
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="recently-viewed">
          <h3>Recently viewed items</h3>
          <p>Sign in to see your recently viewed items</p>
        </div>
      </div>
    );
  }

  // Filled Cart State - Amazon Style
  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Left Column - Shopping Cart Items */}
        <div className="cart-left-column">
          <h1>Shopping Cart</h1>
          
          {/* Cart Items Header */}
          <div className="cart-items-header">
            <span className="items-header-title">Items</span>
            <span className="items-header-price">Price</span>
            <span className="items-header-quantity">Quantity</span>
            <span className="items-header-total">Total</span>
          </div>

          {/* Cart Items List */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-image">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                </div>
                
                <div className="cart-item-details-col">
                  <div className="cart-item-title">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </div>
                  
                  {item.inStock && (
                    <div className="cart-item-stock">
                      <i className="fas fa-check-circle"></i> In Stock
                    </div>
                  )}
                  
                  <div className="cart-item-actions-row">
                    <div className="cart-quantity-selector">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="cart-delete-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                    
                    <button className="cart-save-later">
                      <i className="fas fa-heart"></i> Save for later
                    </button>
                  </div>
                </div>
                
                <div className="cart-item-price-col">
                  R{item.price.toLocaleString()}
                </div>
                
                <div className="cart-item-total-col">
                  R{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal Line */}
          <div className="cart-subtotal-line">
            <span>Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items):</span>
            <strong>R{subtotal.toLocaleString()}</strong>
          </div>
        </div>

        {/* Right Column - Order Summary (Amazon Style) */}
        <div className="cart-right-column">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Items ({cartItems.reduce((sum, i) => sum + i.quantity, 0)}):</span>
              <span>R{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery fee:</span>
              <span>{deliveryFee === 0 ? 'FREE' : `R${deliveryFee.toLocaleString()}`}</span>
            </div>
            
            <div className="summary-row">
              <span>Estimated tax (15% VAT):</span>
              <span>R{estimatedTax.toLocaleString()}</span>
            </div>
            
            <div className="summary-row delivery-info">
              <i className="fas fa-truck"></i>
              <span>FREE Delivery on orders over R500</span>
            </div>
            
            <div className="summary-total">
              <span>Order total:</span>
              <span className="total-amount">R{total.toLocaleString()}</span>
            </div>
            
            <button 
              className="proceed-checkout-btn"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-lock"></i> Proceed to Checkout
                </>
              )}
            </button>
            
            <div className="secure-checkout-note">
              <i className="fas fa-shield-alt"></i>
              <span>Secure transaction • Return policy</span>
            </div>
          </div>

          {/* Gift Card/Promo Section */}
          <div className="gift-card-section">
            <button className="gift-card-btn">
              <i className="fas fa-gift"></i> Apply gift card or promo code
            </button>
          </div>
        </div>
      </div>

      {/* Recommended for You Section */}
      <div className="recommended-section">
        <div className="recommended-header">
          <h3>Customers who bought items in your cart also bought</h3>
        </div>
        <div className="recommended-grid">
          {/* You can populate with actual recommended products */}
          <div className="recommended-placeholder">
            <p>Recommended products will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;