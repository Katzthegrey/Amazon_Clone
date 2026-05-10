import initialData from './products.json';

const PRODUCTS_KEY = 'amazon_za_products';
const USERS_KEY = 'amazon_za_users';
const ORDERS_KEY = 'amazon_za_orders';

// Cursor code: catalog always re-seeded from products.json on load so category pages match the file
// (otherwise an old localStorage snapshot hid new/changed products forever).
export const initializeStorage = () => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialData.products));
  
  if (!localStorage.getItem(USERS_KEY)) {
    // Create a default test user
    const defaultUsers = [
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  
  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  }
};

// Product Functions
export const getProducts = () => {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore bad localStorage */
  }
  return initialData.products || [];
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  const products = getProducts();
  if (category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const products = getProducts();
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subcategory.toLowerCase().includes(searchTerm)
  );
};

export const getCategories = () => {
  const products = getProducts();
  const categories = ['All', ...new Set(products.map(p => p.category))];
  return categories;
};

// Order Functions
export const saveOrder = (order) => {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const newOrder = {
    id: Date.now(),
    ...order,
    orderDate: new Date().toISOString(),
    status: 'Pending'
  };
  orders.push(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return newOrder;
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
};