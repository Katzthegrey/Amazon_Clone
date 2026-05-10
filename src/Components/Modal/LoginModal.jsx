import React, { useState, useRef, useEffect } from 'react';

const LoginModal = ({ onClose, onLogin, error, loading, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const emailInputRef = useRef(null);
  
  // Auto-focus email input when modal opens
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onLogin(formData.email, formData.password);
    if (result.success) {
      setFormData({ email: '', password: '' });
      onClose();
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="auth-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="auth-footer">
          <span>Don't have an account? </span>
          <button type="button" className="auth-switch" onClick={onSwitchToSignup}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;