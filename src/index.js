import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './theme-dark.css';

const THEME_KEY = 'amazon_clone_theme';
try {
  const raw = localStorage.getItem(THEME_KEY);
  const theme = raw != null ? JSON.parse(raw) : 'light';
  document.documentElement.setAttribute(
    'data-theme',
    theme === 'dark' ? 'dark' : 'light'
  );
} catch {
  document.documentElement.setAttribute('data-theme', 'light');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


