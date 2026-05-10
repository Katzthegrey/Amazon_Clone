// Cursor code: home category tiles are built from products.json (grouped by category + subcategory).

const displayOverrides = {
  Electronics: {
    title: "Electronics & Gadgets",
    subtitle: "Up to 40% off",
    icon: "📱",
  },
  "Home & Kitchen": {
    title: "Everything for your home",
    subtitle: "Starting from R149",
    icon: "🏠",
  },
  Fashion: {
    title: "Fashion & Style",
    subtitle: "New season arrivals",
    icon: "👕",
  },
  Gaming: {
    title: "Gaming & Entertainment",
    subtitle: "Level up your game",
    icon: "🎮",
  },
  "Toys & Games": {
    title: "Toys & Games",
    subtitle: "Fun for all ages",
    icon: "🎲",
  },
  "Sports & Outdoors": {
    title: "Sports & Outdoors",
    subtitle: "Gear up for adventure",
    icon: "⚽",
  },
  Books: {
    title: "Books & Media",
    subtitle: "Bestsellers on sale",
    icon: "📚",
  },
  "Smart Home": {
    title: "Smart Home",
    subtitle: "Connect your world",
    icon: "🏠",
  },
};

export const generateDynamicCategories = (products, onCategoryClick) => {
  const categoryGroups = {};

  (products || []).forEach((product) => {
    const cat = product.category;
    if (!cat) return;
    if (!categoryGroups[cat]) categoryGroups[cat] = [];
    categoryGroups[cat].push(product);
  });

  return Object.keys(categoryGroups)
    .sort((a, b) => a.localeCompare(b))
    .map((categoryKey, index) => {
      const productsInCat = categoryGroups[categoryKey];
      const override = displayOverrides[categoryKey] || {
        title: categoryKey,
        subtitle: `${productsInCat.length} items`,
        icon: "🛒",
      };

      const uniqueSubcategories = [
        ...new Set(
          productsInCat.map((p) => p.subcategory).filter(Boolean)
        ),
      ];
      const subcategoriesToShow = uniqueSubcategories.slice(0, 4);

      let items = subcategoriesToShow.map((subcat) => {
        const representativeProduct = productsInCat.find(
          (p) => p.subcategory === subcat
        );
        return {
          name: subcat,
          image:
            representativeProduct?.image ||
            "https://via.placeholder.com/200x200?text=No+Image",
          count: productsInCat.filter((p) => p.subcategory === subcat).length,
          subcategory: subcat,
        };
      });

      if (items.length === 0 && productsInCat.length > 0) {
        items = [
          {
            name: `Shop ${categoryKey}`,
            image:
              productsInCat[0].image ||
              "https://via.placeholder.com/200x200?text=No+Image",
            count: productsInCat.length,
            subcategory: categoryKey,
          },
        ];
      }

      return {
        id: index + 1,
        title: override.title,
        subtitle: override.subtitle,
        icon: override.icon,
        items,
        link: `/category/${encodeURIComponent(categoryKey)}`,
        onViewAll: () => onCategoryClick(categoryKey),
      };
    })
    .filter((card) => card.items.length > 0);
};
