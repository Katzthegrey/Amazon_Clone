import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../Components/ProductCard/ProductCard';
import './CategoryPage.css';

// Cursor code: listings and sidebar filters (category, subcategory, price) are driven by the
// product list from products.json loaded via storage in App — "All" shows every product.

const filterByRouteCategory = (allProducts, routeLabel) => {
  const label = routeLabel.trim().toLowerCase();

  const categoryMatches = allProducts.filter(
    (p) => p.category?.trim().toLowerCase() === label
  );

  if (categoryMatches.length > 0) {
    return categoryMatches;
  }

  return allProducts.filter(
    (p) => p.subcategory?.trim().toLowerCase() === label
  );
};

const CategoryPage = ({ products, onAddToCart, isInCart, onProductClick }) => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');

  const decodedCategory = decodeURIComponent(categoryName);
  const isAllCategory = decodedCategory.trim().toLowerCase() === 'all';

  const productsForSubcategoryList = useMemo(() => {
    if (!products?.length) return [];
    if (isAllCategory) return products;
    return filterByRouteCategory(products, decodedCategory);
  }, [products, decodedCategory, isAllCategory]);

  const subcategoryOptions = useMemo(() => {
    const names = productsForSubcategoryList
      .map((p) => p.subcategory)
      .filter(Boolean);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }, [productsForSubcategoryList]);

  useEffect(() => {
    setSubcategoryFilter('all');
  }, [categoryName]);

  useEffect(() => {
    let filtered = [...products];

    if (isAllCategory) {
      // keep full catalog
    } else {
      filtered = filterByRouteCategory(filtered, decodedCategory);
    }

    if (subcategoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.subcategory === subcategoryFilter);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter((p) => p.price >= min && (max ? p.price <= max : true));
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [categoryName, products, priceRange, sortBy, subcategoryFilter, decodedCategory, isAllCategory]);

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="category-page">
      <div className="breadcrumb">
        <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{decodedCategory}</span>
        <span className="product-count">({filteredProducts.length} products)</span>
      </div>

      <div className="category-layout">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          {subcategoryOptions.length > 0 && (
            <div className="filter-section">
              <h4>Subcategory</h4>
              <div className="price-options">
                <label>
                  <input
                    type="radio"
                    name="subcategory"
                    value="all"
                    checked={subcategoryFilter === 'all'}
                    onChange={(e) => setSubcategoryFilter(e.target.value)}
                  />
                  All
                </label>
                {subcategoryOptions.map((sub) => (
                  <label key={sub}>
                    <input
                      type="radio"
                      name="subcategory"
                      value={sub}
                      checked={subcategoryFilter === sub}
                      onChange={(e) => setSubcategoryFilter(e.target.value)}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="filter-section">
            <h4>Sort by</h4>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-options">
              <label>
                <input type="radio" name="price" value="all" checked={priceRange === 'all'} onChange={(e) => setPriceRange(e.target.value)} />
                All
              </label>
              <label>
                <input type="radio" name="price" value="0-500" checked={priceRange === '0-500'} onChange={(e) => setPriceRange(e.target.value)} />
                Under R500
              </label>
              <label>
                <input type="radio" name="price" value="500-1000" checked={priceRange === '500-1000'} onChange={(e) => setPriceRange(e.target.value)} />
                R500 - R1000
              </label>
              <label>
                <input type="radio" name="price" value="1000-2000" checked={priceRange === '1000-2000'} onChange={(e) => setPriceRange(e.target.value)} />
                R1000 - R2000
              </label>
              <label>
                <input type="radio" name="price" value="2000-5000" checked={priceRange === '2000-5000'} onChange={(e) => setPriceRange(e.target.value)} />
                R2000 - R5000
              </label>
              <label>
                <input type="radio" name="price" value="5000-999999" checked={priceRange === '5000-999999'} onChange={(e) => setPriceRange(e.target.value)} />
                R5000+
              </label>
            </div>
          </div>
        </aside>

        <main className="category-products">
          <div className="results-header">
            <h2>{decodedCategory}</h2>
            <p>{filteredProducts.length} results found</p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results-category">
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse other categories</p>
              <button onClick={() => navigate('/')} className="shop-now-btn">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="products-grid-category">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  isInCart={isInCart(product.id)}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;