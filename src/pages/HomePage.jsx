import React from "react";
import HeroSection from "../Components/Layout/HeroSection/HeroSection";
import HeroBannerCards from "../Components/Layout/HeroBannerCards/HeroBannerCards";
import CategoryMultiCard from "../Components/Layout/CategoryMultiCard/CategoryMultiCard";
import BrowsingHistory from "../Components/Layout/BrowsingHistory/BrowsingHistory";
import { heroBanners } from "../data/bannerData";
import { promoBanners } from "../data/promoBanners";
import { categoryMultiCards } from "../data/categoryMultiCards";

const HomePage = ({
  products,
  productsToShow = [],
  loading = false,
  onCategoryClick,
  onProductClick,
  onBannerClick,
  authState,
  cartState,
  onAddToCart,
  isInCart,
}) => {
  return (
    <div className="homepage">
      <HeroSection
        banners={heroBanners}
        autoPlayInterval={5000}
        height="400px"
        onBannerClick={onBannerClick}
      />

      <HeroBannerCards banners={promoBanners} />

      <CategoryMultiCard
        categories={categoryMultiCards}
        onItemClick={(item) => {
          const target =
            item.navigateTarget || item.subcategory || item.name;
          if (target) onCategoryClick(target);
        }}
        onViewAllClick={(category) => {
          if (category.viewAllSlug) onCategoryClick(category.viewAllSlug);
        }}
      />

      {authState?.isAuthenticated && (
        <div className="welcome-banner">
          <div className="welcome-text">
            Welcome back, {authState.user?.name}!
          </div>
          {cartState?.totalItems > 0 && (
            <div className="cart-preview">
              You have {cartState.totalItems} item
              {cartState.totalItems !== 1 ? "s" : ""} in your cart
            </div>
          )}
        </div>
      )}

      <BrowsingHistory
        products={products}
        maxItems={8}
        onProductClick={onProductClick}
      />
    </div>
  );
};

export default HomePage;
