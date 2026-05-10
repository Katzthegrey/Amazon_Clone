import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Back to Top Button */}
      <div className="footer-back-to-top" onClick={scrollToTop}>
        Back to top
      </div>
      
      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-links-grid">
            {/* Column 1 - Get to Know Us */}
            <div className="footer-column">
              <h3 className="footer-title">Get to Know Us</h3>
              <ul className="footer-links">
                <li><a href="/about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press Releases</a></li>
                <li><a href="/amazon-science">Amazon Science</a></li>
              </ul>
            </div>
            
            {/* Column 2 - Connect with Us */}
            <div className="footer-column">
              <h3 className="footer-title">Connect with Us</h3>
              <ul className="footer-links">
                <li><a href="/facebook">Facebook</a></li>
                <li><a href="/twitter">Twitter</a></li>
                <li><a href="/instagram">Instagram</a></li>
                <li><a href="/linkedin">LinkedIn</a></li>
              </ul>
            </div>
            
            {/* Column 3 - Make Money with Us */}
            <div className="footer-column">
              <h3 className="footer-title">Make Money with Us</h3>
              <ul className="footer-links">
                <li><a href="/sell">Sell on amazon.za</a></li>
                <li><a href="/business">Sell under Amazon Business</a></li>
                <li><a href="/affiliates">Become an Affiliate</a></li>
                <li><a href="/advertise">Advertise Your Products</a></li>
                <li><a href="/publish">Self-Publish with Us</a></li>
              </ul>
            </div>
            
            {/* Column 4 - Let Us Help You */}
            <div className="footer-column">
              <h3 className="footer-title">Let Us Help You</h3>
              <ul className="footer-links">
                <li><a href="/covid">COVID-19 and Amazon</a></li>
                <li><a href="/account">Your Account</a></li>
                <li><a href="/orders">Your Orders</a></li>
                <li><a href="/shipping">Shipping Rates & Policies</a></li>
                <li><a href="/returns">Returns & Replacements</a></li>
                <li><a href="/help">Help Center</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-logo">
              <span className="footer-logo-text">amazon.za</span>
            </div>
            
            <div className="footer-country-selector">
              <select className="country-select">
                <option value="ZA">🇿🇦 South Africa</option>
                <option value="US">🇺🇸 United States</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="FR">🇫🇷 France</option>
                <option value="JP">🇯🇵 Japan</option>
              </select>
            </div>
            
            <div className="footer-payment-methods">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">💵</span>
              <span className="payment-icon">🏦</span>
              <span className="payment-icon">📱</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="footer-copyright">
        <div className="footer-container">
          <div className="copyright-content">
            <p>© 1996-2024, amazon.za, Inc. or its affiliates</p>
            <div className="copyright-links">
              <a href="/conditions">Conditions of Use</a>
              <a href="/privacy">Privacy Notice</a>
              <a href="/interest-based-ads">Interest-Based Ads</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;