## What This Application Does

Amazon.za is a fully functional e-commerce front-end that runs entirely in your browser. You can browse 42 products across 8 categories, search and filter items, manage a shopping cart with quantity controls, create user accounts, and maintain persistent state through local storage. No backend required.

## Core Architecture

The application uses React with a reducer-based state management pattern. Three independent state systems operate simultaneously:

- **Authentication State** - Tracks login status, user profiles, and modal visibility
- **Cart State** - Maintains items, calculates running totals, handles quantity mutations  
- **Product State** - Manages master catalog and filtered views

Every user action dispatches an action that processes through a pure reducer function, returning a new immutable state. This triggers targeted component re-renders without page refresh.

## User Interactions Explained

**Account Creation & Login**

Click "Hello, Sign in" to open a modal dialog. The registration flow accepts any email/password combination, stores credentials in localStorage under the `amazon_za_users` key, and immediately authenticates the new user. Login compares submitted credentials against stored user records. The authentication persists across browser sessions - closing and reopening the application maintains your logged-in state until you explicitly sign out.

**Finding Products**

Four parallel discovery methods:

1. **Global Search** - Scans product names, categories, subcategories, and descriptions. Case-insensitive substring matching. Press Ctrl+K (Windows) or Cmd+K (Mac) to focus the search bar without mouse interaction.

2. **Category Filter** - Horizontal chips derived from unique product categories. Clicking dispatches a filter action that recomputes the displayed product array. The URL updates via React Router without full page reload.

3. **Category Cards** - Dynamically generated from actual product data. Each card groups subcategories (like "Headphones" under "Electronics") and displays representative images from real products. Product counts show available inventory per subcategory.

4. **Direct Navigation** - Click any product card to route to `/product/:id`. The product detail page fetches the full object by ID and displays specifications, description, and related products from the same category.

**Cart Management**

The cart uses a reducer with four action types:

- `ADD_TO_CART` - Checks existing cart for product ID; increments quantity if found, adds new entry if not
- `UPDATE_QUANTITY` - Modifies quantity value; automatically removes item if quantity reaches zero
- `REMOVE_FROM_CART` - Deletes item regardless of quantity
- `CLEAR_CART` - Empties entire cart array

Each mutation recalculates total items and total price before updating both in-memory state and localStorage. The cart page displays items with individual line totals, quantity selectors, and delete buttons. The order summary shows subtotal, delivery fee (free over R500), 15% VAT, and final total.

**Data Persistence**

Three localStorage keys maintain state:

| Key | Data Stored | Update Triggers |
|-----|-------------|-----------------|
| `amazon_za_products` | 42-item catalog with prices, ratings, specs | Never (static reference) |
| `amazon_za_users` | User accounts with email, hashed passwords | Registration form submission |
| `shopping_cart` | Cart items, quantities, pre-calculated totals | Every add/remove/quantity change |

On application mount, the initialization function checks for existing storage and hydrates state accordingly. Empty storage receives default product catalog and one test user account.

**Browsing History**

The recently viewed system maintains an array of product IDs capped at 20 entries. Visiting any product detail page triggers `addToRecentlyViewed(productId)`, which removes duplicates, unshifts the new ID to the front, and truncates the array. The homepage reads this array, maps IDs to full product objects, and displays clickable thumbnails.

**Responsive Breakpoints**

CSS media queries handle four screen sizes:

- **Mobile (<768px)** - Hamburger menu replaces navigation links; category chips become dropdown; product grid 1 column; cart stacks vertically
- **Tablet (768-1024px)** - Partial navigation visible; horizontal scrolling category bar; product grid 2 columns
- **Desktop (1024-1440px)** - Full navigation; sticky filter sidebar; product grid 4 columns; cart side-by-side with sticky checkout
- **Ultrawide (>1440px)** - Content container max-width 1600px; centered layout with white space margins

The mobile menu uses fixed positioning with slide-in animation and prevents body scroll while open. Click outside or any menu item closes it.

**Visual Feedback System**

Every user action provides immediate visual confirmation:

- Cart badge animates with bounce keyframe on item addition
- Product cards lift with box-shadow transition on hover
- Buttons scale to 0.98 on active state for press feedback
- Quantity buttons change background color on hover
- Focus rings appear for keyboard navigation using `:focus-visible` pseudo-class

**Error Handling & Edge Cases**

The application gracefully handles common failure modes:

- **Missing product images** - `onError` event triggers fallback to placeholder
- **Empty search results** - Conditional rendering shows no-results message with continue shopping button
- **Invalid product ID in URL** - Category page returns empty grid state
- **No localStorage access** - State persists in memory only, warns console without crashing
- **Out of stock products** - Add to cart button disables, stock status shows red text

**State Flow Example: Adding an Item**

1. User clicks "Add to Cart" on product card
2. `cartDispatch({ type: 'ADD_TO_CART', payload: product })` fires
3. Reducer finds existing item or creates new entry
4. Updated items array calculated with new quantity
5. `totalItems` and `totalPrice` recomputed via reduce operations
6. New cart state object returned
7. `useEffect` hook detects state change and writes to localStorage
8. Component re-renders with updated cart badge and button text ("✓ Added to Cart")
9. CSS transition animates the badge count change

**Performance Characteristics**

The product catalog loads once on initial mount (approximately 25KB JSON). All filtering, searching, and sorting executes client-side with O(n) time complexity. React.memo prevents unnecessary re-renders of product cards when parent state changes unrelated to the item. The development server uses hot module replacement for instant feedback during code changes.

**Testing the Application**

To verify functionality:
- Open browser DevTools Application tab to inspect localStorage keys
- Reduce network throttle to test offline persistence
- Toggle device emulation to validate responsive breakpoints
- Use keyboard only to verify accessibility navigation
- Clear localStorage to reset to fresh application state

---

The application combines React's declarative rendering with localStorage persistence to create a fully functional e-commerce experience that requires no backend, no database, and no external API dependencies. All 42 products, cart operations, user authentication, and browsing history operate entirely within your browser.
