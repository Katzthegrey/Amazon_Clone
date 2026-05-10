import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import LoginModal from '../Modal/LoginModal';
import SignupModal from '../Modal/SignupModal';
import './Navbar.css';

const Navbar = ({ 
  cartItemCount, 
  authState, 
  onLogin, 
  onSignup, 
  onLogout,
  onOpenModal,
  onCloseModal, 
  amazonLogo,
  onSearch,
  theme = 'light',
  onToggleTheme,
}) => {
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('All');
  
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Handle keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      setIsMenuOpen(false);
    }
  };
  
  const handleAuthClick = () => {
    if (authState.isAuthenticated) {
      onLogout();
      navigate('/');
    } else {
      onOpenModal('login');
    }
    setIsMenuOpen(false);
  };
  
  const handleCartClick = () => {
    navigate('/cart');
    setIsMenuOpen(false);
  };
  
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };
  
  const handleAccountClick = () => {
    if (authState.isAuthenticated) {
      navigate('/account');
    } else {
      onOpenModal('login');
    }
    setIsMenuOpen(false);
  };
  
  const handleOrdersClick = () => {
    if (authState.isAuthenticated) {
      navigate('/orders');
    } else {
      onOpenModal('login');
    }
    setIsMenuOpen(false);
  };
  
  const handleLocationClick = () => {
    // You can implement location modal here
    console.log('Location selector clicked');
  };
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-logo" onClick={handleLogoClick}>
            <a href="/" className="logo-link" onClick={(e) => e.preventDefault()}>
              <img 
                src={amazonLogo}
                alt="Amazon" 
                className="logo-image"
              />
              <span className="logo-domain">.co.za</span>
            </a>
          </div>
          
          {/* Delivery Location */}
          <div className="navbar-location" onClick={handleLocationClick}>
            <span className="delivery-label">
              <i className="fas fa-map-marker-alt"></i> Deliver to
            </span>
            <span className="delivery-location">South Africa</span>
          </div>
          
          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <select 
              className="search-category"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Home & Kitchen</option>
              <option>Fashion</option>
              <option>Books</option>
              <option>Toys & Games</option>
            </select>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Amazon.co.za"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
          
          {/* Right Side Links */}
          <div className="navbar-links">
            {onToggleTheme && (
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden />
              </button>
            )}
            <div className="nav-link" onClick={handleAuthClick}>
              <span className="nav-line1">
                {authState.isAuthenticated ? `Hello, ${authState.user?.name?.split(' ')[0]}` : 'Hello, Sign in'}
              </span>
              <span className="nav-line2">
                Account & Lists
                <i className="fas fa-chevron-down"></i>
              </span>
            </div>
            
            <div className="nav-link" onClick={handleOrdersClick}>
              <span className="nav-line1">Returns</span>
              <span className="nav-line2">& Orders</span>
            </div>
            
            <div className="nav-cart" onClick={handleCartClick}>
              <span className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
              </span>
              <span className="cart-count">{cartItemCount}</span>
              <span className="cart-text">Cart</span>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div ref={mobileMenuRef} className="mobile-menu">
            <div className="mobile-menu-header">
              <div className="mobile-menu-user">
                <i className="fas fa-user-circle"></i>
                <span>
                  {authState.isAuthenticated ? authState.user?.name : 'Hello, Sign in'}
                </span>
              </div>
            </div>
            
            <div className="mobile-menu-items">
              <div className="mobile-menu-item" onClick={handleAccountClick}>
                <i className="fas fa-user"></i>
                <span>Account & Lists</span>
                <i className="fas fa-chevron-right"></i>
              </div>
              
              <div className="mobile-menu-item" onClick={handleOrdersClick}>
                <i className="fas fa-box"></i>
                <span>Returns & Orders</span>
                <i className="fas fa-chevron-right"></i>
              </div>
              
              <div className="mobile-menu-item" onClick={handleCartClick}>
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
                <span className="mobile-cart-count">{cartItemCount} items</span>
                <i className="fas fa-chevron-right"></i>
              </div>
              
              <div className="mobile-menu-item" onClick={handleLocationClick}>
                <i className="fas fa-map-marker-alt"></i>
                <span>Deliver to South Africa</span>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
            
            {authState.isAuthenticated && (
              <div className="mobile-menu-footer">
                <button onClick={onLogout} className="mobile-logout">
                  <i className="fas fa-sign-out-alt"></i>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      
      {/* Auth Modals */}
      <Modal 
        isOpen={authState.modalOpen && authState.modalType === 'login'} 
        onClose={() => onCloseModal()}
        title="Sign in"
      >
        <LoginModal
          onClose={onCloseModal}
          onLogin={onLogin}
          error={authState.error}
          loading={authState.loading}
          onSwitchToSignup={() => onOpenModal('signup')}
        />
      </Modal>
      
      <Modal 
        isOpen={authState.modalOpen && authState.modalType === 'signup'} 
        onClose={() => onCloseModal()}
        title="Create account"
      >
        <SignupModal
          onClose={onCloseModal}
          onSignup={onSignup}
          error={authState.error}
          loading={authState.loading}
          onSwitchToLogin={() => onOpenModal('login')}
        />
      </Modal>
    </>
  );
};

export default Navbar;