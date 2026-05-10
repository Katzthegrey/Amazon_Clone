import React, { useState, useRef, useEffect } from 'react';

const SignupModal = ({ onClose, onSignup, error, loading, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationError, setValidationError] = useState('');
  
  const nameInputRef = useRef(null);
  
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);
  
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }
    
    if (!formData.name.trim()) {
      setValidationError('Name is required');
      return false;
    }
    
    setValidationError('');
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const { confirmPassword, ...userData } = formData;
    const result = await onSignup(userData);
    
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      onClose();
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (validationError) setValidationError('');
  };
  
  return (
    <div className="auth-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
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
            placeholder="Minimum 6 characters"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>
        
        {(error || validationError) && (
          <div className="error-message">{error || validationError}</div>
        )}
        
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        
        <div className="auth-footer">
          <span>Already have an account? </span>
          <button type="button" className="auth-switch" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupModal;