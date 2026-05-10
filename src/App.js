import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import CategoryBar from "./Components/CategoryBar/CategoryBar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Footer from "./Components/Footer/Footer";
import SupportChat from "./Components/SupportChat/SupportChat";
import { useAuth } from "./hooks/useAuth";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { cartReducer, cartInitialState } from "./reducers/cartReducer";
import ProductCard from "./Components/ProductCard/ProductCard";
import {
  initializeStorage,
  getProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
  searchProducts,
} from "./data/storage";
import amazonLogo from "./assets/images-removebg-preview (1).png";
// import "./styles/global.css";

// Wrapper component to use navigate hook
const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Hooks
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const [persistedCart] = useLocalStorage("shopping_cart", cartState);
  const [theme, setTheme] = useLocalStorage("amazon_clone_theme", "light");
  const { authState, login, signup, logout, openModal, closeModal } = useAuth();

  // Load data on mount
  useEffect(() => {
    initializeStorage();
    loadAllProducts();
    loadCategories();

    // Load cart from localStorage
    if (persistedCart.items && persistedCart.items.length > 0) {
      cartDispatch({ type: "LOAD_CART", payload: persistedCart });
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (cartState.items.length > 0) {
      localStorage.setItem("shopping_cart", JSON.stringify(cartState));
    } else if (cartState.items.length === 0) {
      localStorage.removeItem("shopping_cart");
    }
  }, [cartState]);

  useEffect(() => {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const loadAllProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setLoading(false);
  };

  const loadCategories = () => {
    const cats = getCategories();
    setCategories(cats);
  };

  // Handle search from Navbar
  const handleSearch = (query) => {
    if (query.trim()) {
      const results = searchProducts(query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      navigate("/");
    }
  };

  // Cart actions
  const addToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId) => {
    cartDispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    cartDispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    cartDispatch({ type: "CLEAR_CART" });
  };

  const isInCart = (productId) => {
    return cartState.items.some((item) => item.id === productId);
  };

  // Modal actions
  const handleOpenModal = (type) => {
    openModal(type);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  // Navigation handlers
  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/category/${encodeURIComponent(subcategory)}`);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleBannerClick = (banner) => {
    if (banner.link) {
      navigate(banner.link);
    }
  };

  // Get search results from URL query param
  const getSearchResults = () => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      return searchProducts(query);
    }
    return [];
  };

  // Cursor code: highlight the active category tab when you are on /category/:categoryName (e.g. All, Electronics).
  const categoryPathMatch = location.pathname.match(/^\/category\/([^/]+)/);
  const selectedCategoryBar = categoryPathMatch
    ? decodeURIComponent(categoryPathMatch[1])
    : undefined;

  return (
    <div className="app">
      <Navbar
        cartItemCount={cartState.totalItems}
        authState={authState}
        onLogin={login}
        onSignup={signup}
        onLogout={logout}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        onSearch={handleSearch}
        amazonLogo={amazonLogo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategoryBar}
        onCategoryChange={handleCategoryClick}
      />

      <main className="main-content">
        <Routes>
          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <HomePage
                products={products}
                productsToShow={products.slice(0, 8)}
                loading={loading}
                onCategoryClick={handleSubcategoryClick}
                onViewAllClick={handleCategoryClick}
                onProductClick={handleProductClick}
                onBannerClick={handleBannerClick}
                authState={authState}
                cartState={cartState}
                onAddToCart={addToCart}
                isInCart={isInCart}
              />
            } 
          />

          {/* Category Page */}
          <Route 
            path="/category/:categoryName" 
            element={
              <CategoryPage
                products={products}
                onAddToCart={addToCart}
                isInCart={isInCart}
                onProductClick={handleProductClick}
              />
            } 
          />

          {/* Product Detail Page */}
          <Route 
            path="/product/:productId" 
            element={
              <ProductDetailPage
                products={products}
                onAddToCart={addToCart}
                isInCart={isInCart}
                onProductClick={handleProductClick}
              />
            } 
          />

          {/* Cart Page */}
          <Route 
            path="/cart" 
            element={
              <CartPage
                cartItems={cartState.items}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            } 
          />

          {/* Search Results Page */}
          <Route 
            path="/search" 
            element={
              <div className="search-results-page">
                <div className="search-header">
                  <h2>Search Results</h2>
                  <button onClick={() => navigate('/')} className="back-home-btn">
                    ← Back to Home
                  </button>
                </div>
                {loading ? (
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <div className="products-grid">
                    {getSearchResults().map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        isInCart={isInCart(product.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            } 
          />
        </Routes>
      </main>

      <Footer />

      <SupportChat />
    </div>
  );
};

// Main App component with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;