import React, { useState, useEffect, useRef } from "react";
import "./RestaurantWebsite.css";
import {
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
  FaWhatsapp,
  FaPhoneAlt,
  FaTwitter,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import data from "../pages/formatted_data.json";

const RestaurantWebsiteoriginal = () => {
  const [language, setLanguage] = useState("ar");
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isCategoryBarSticky, setIsCategoryBarSticky] = useState(false);
  const heroRef = useRef(null);
  const categoryBarRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translations = {
    ar: {
      restaurantName: "اچای",
      tagline: "تجربة طعام استثنائية",
      exploreMenu: "استكشف القائمة",
      categories: {
        all: "الكل",
        breakfast: "فطور",
        main: "وجبات رئيسية",
        drinks: "مشروبات",
        desserts: "حلويات",
        salads: "سلطات",
      },
      viewModes: {
        grid: "شبكة",
        list: "قائمة",
      },
      currency: "₪",
      addToCart: "أضف للسلة",
      followUs: "تابعنا",
    },
    en: {
      restaurantName: "Achay",
      tagline: "Exceptional Dining Experience",
      exploreMenu: "Explore Menu",
      categories: {
        all: "All",
        breakfast: "Breakfast",
        main: "Main Dishes",
        drinks: "Drinks",
        desserts: "Desserts",
        salads: "Salads",
      },
      viewModes: {
        grid: "Grid",
        list: "List",
      },
      currency: "$",
      addToCart: "Add to Cart",
      followUs: "Follow Us",
    },
  };

  const t = translations[language];

  const categories = [
    { id: "all", name: t.categories.all, icon: "🍽️" },
    { id: "breakfast", name: t.categories.breakfast, icon: "🍳" },
    { id: "main", name: t.categories.main, icon: "🍛" },
    { id: "drinks", name: t.categories.drinks, icon: "☕" },
    { id: "desserts", name: t.categories.desserts, icon: "🍰" },
    { id: "salads", name: t.categories.salads, icon: "🥗" },
  ];

  const menuItems = [
    {
      id: 1,
      name: language === "ar" ? "وجبة الفطور الكاملة" : "Complete Breakfast",
      description:
        language === "ar"
          ? "مع الشاي الساخن والخبز الطازج"
          : "With hot tea and fresh bread",
      price: "22.00",
      image: "/download (1).jpeg?height=200&width=200&text=Breakfast",
      category: "breakfast",
    },
    {
      id: 2,
      name: language === "ar" ? "فطور تقليدي" : "Traditional Breakfast",
      description:
        language === "ar"
          ? "وجبة فطور تقليدية مع المربى"
          : "Traditional breakfast with jam",
      price: "18.00",
      image: "/images.webp?height=200&width=200&text=Traditional",
      category: "breakfast",
    },
    {
      id: 3,
      name: language === "ar" ? "مقلق نباتي" : "Vegetarian Stir-fry",
      description:
        language === "ar"
          ? "خضار مشكلة مع التوابل الخاصة"
          : "Mixed vegetables with special spices",
      price: "19.00",
      image: "/placeholder.svg?height=200&width=200&text=Vegetarian",
      category: "main",
    },
    {
      id: 4,
      name: language === "ar" ? "فول مدمس" : "Fava Beans",
      description:
        language === "ar"
          ? "فول مدمس مع الطحينة والسلطة"
          : "Fava beans with tahini and salad",
      price: "15.00",
      image: "/placeholder.svg?height=200&width=200&text=Fava",
      category: "main",
    },
    {
      id: 5,
      name: language === "ar" ? "حليم لذيذ" : "Delicious Haleem",
      description:
        language === "ar"
          ? "حليم مطبوخ ببطء مع اللحم"
          : "Slow-cooked haleem with meat",
      price: "25.00",
      image: "/placeholder.svg?height=200&width=200&text=Haleem",
      category: "main",
    },
    {
      id: 6,
      name: language === "ar" ? "شاي أحمر" : "Black Tea",
      description:
        language === "ar"
          ? "شاي أحمر تقليدي مع السكر"
          : "Traditional black tea with sugar",
      price: "5.00",
      image: "/placeholder.svg?height=200&width=200&text=Tea",
      category: "drinks",
    },
    {
      id: 7,
      name: language === "ar" ? "قهوة عربية" : "Arabic Coffee",
      description:
        language === "ar"
          ? "قهوة عربية أصيلة مع الهيل"
          : "Authentic Arabic coffee with cardamom",
      price: "8.00",
      image: "/placeholder.svg?height=200&width=200&text=Coffee",
      category: "drinks",
    },
    {
      id: 8,
      name: language === "ar" ? "كنافة نابلسية" : "Nablus Knafeh",
      description:
        language === "ar"
          ? "كنافة نابلسية بالجبن والقطر"
          : "Nablus knafeh with cheese and syrup",
      price: "12.00",
      image: "/placeholder.svg?height=200&width=200&text=Knafeh",
      category: "desserts",
    },
    {
      id: 9,
      name: language === "ar" ? "مهلبية" : "Muhallabia",
      description:
        language === "ar"
          ? "مهلبية بالفستق والقرفة"
          : "Muhallabia with pistachios and cinnamon",
      price: "10.00",
      image: "/placeholder.svg?height=200&width=200&text=Muhallabia",
      category: "desserts",
    },
    {
      id: 10,
      name: language === "ar" ? "سلطة فتوش" : "Fattoush Salad",
      description:
        language === "ar"
          ? "سلطة فتوش مع الخبز المحمص"
          : "Fattoush salad with toasted bread",
      price: "14.00",
      image: "/placeholder.svg?height=200&width=200&text=Fattoush",
      category: "salads",
    },
    {
      id: 11,
      name: language === "ar" ? "تبولة" : "Tabbouleh",
      description:
        language === "ar"
          ? "تبولة بالبقدونس والطماطم"
          : "Tabbouleh with parsley and tomatoes",
      price: "12.00",
      image: "/placeholder.svg?height=200&width=200&text=Tabbouleh",
      category: "salads",
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const socialSection = document.querySelector(".social-section");
      const scrollY = window.scrollY;

      // Show navbar when scrolled past hero
      setIsNavbarVisible(scrollY > heroHeight * 0.7);

      // Make category bar sticky when it reaches top
      if (socialSection) {
        const socialBottom =
          socialSection.offsetTop + socialSection.offsetHeight;
        setIsCategoryBarSticky(scrollY > socialBottom - 60);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Replace the intersection observer useEffect with this improved version:
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      // Find the entry with the largest intersection ratio
      let mostVisibleEntry = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleEntry = entry;
        }
      });

      // If we have a most visible entry, update active category
      if (mostVisibleEntry) {
        const categoryId = mostVisibleEntry.target.id.replace("category-", "");
        setActiveCategory(categoryId);

        // Center the active category button
        setTimeout(() => {
          centerActiveCategory(categoryId);
        }, 100);
      }

      // Special case: if we're at the very top, set to "all"
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const socialSection = document.querySelector(".social-section");
      const socialHeight = socialSection?.offsetHeight || 0;

      if (scrollY < heroHeight + socialHeight + 100) {
        setActiveCategory("all");
        setTimeout(() => {
          centerActiveCategory("all");
        }, 100);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all category sections
    categories.forEach((category) => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [categories]);

  // Add this new function before the return statement
  const centerActiveCategory = (categoryId) => {
    const categoryScroll = document.querySelector(".category-scroll");
    const activeButton = document.querySelector(
      `[data-category="${categoryId}"]`
    );

    if (categoryScroll && activeButton) {
      const scrollContainer = categoryScroll;
      const button = activeButton;

      const containerWidth = scrollContainer.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;

      const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Update the scrollToCategory function to not interfere with intersection observer:
  const scrollToCategory = (categoryId) => {
    // Don't manually set active category - let intersection observer handle it
    centerActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = isCategoryBarSticky ? 120 : 60;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
    document.dir = language === "ar" ? "ltr" : "rtl";
  };

  // Add this new useEffect for initial state
  useEffect(() => {
    // Set initial active category to "all"
    setActiveCategory("all");
    centerActiveCategory("all");
  }, []);

  // Add these functions before the return statement:
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  // Add click outside handler
  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={`restaurant-app ${language}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Sticky Navbar */}
      <nav className={`sticky-navbar ${isNavbarVisible ? "visible" : ""}`}>
        <div className="navbar-content">
          <div className="navbar-logo">🍽️</div>
          <div className="navbar-title">{t.restaurantName}</div>
          <div className="navbar-actions">
            <button className="language-toggle" onClick={toggleLanguage}>
              {language === "ar" ? "EN" : "عربی"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src="/heroImage.jpg?height=400&width=800&text=Restaurant+Hero"
            alt="Restaurant Hero"
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <div className="restaurant-logo">
            <h1>{t.restaurantName}</h1>
            <p className="tagline">{t.tagline}</p>
          </div>
          <button
            className="cta-button"
            onClick={() => scrollToCategory("all")}
          >
            {t.exploreMenu}
          </button>
        </div>
      </section>

      {/* Social & CTA Section */}
      <section className="social-section">
        <p className="follow-text">{t.followUs}</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon tiktok"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.snapchat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon snapchat"
          >
            <FaSnapchatGhost />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
          >
            <FaWhatsapp />
          </a>
          <a href="tel:+1234567890" className="social-icon phone">
            <FaPhoneAlt />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://maps.google.com/?q=Your+Location"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon location"
          >
            <FaMapMarkerAlt />
          </a>
          <a
            href="https://www.yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon website"
          >
            <FaGlobe />
          </a>
        </div>
      </section>

      <div className="category-bar-container" ref={categoryBarRef}>
        <div className={`category-bar ${isCategoryBarSticky ? "sticky" : ""}`}>
          <div className="category-scroll">
            {categories.map((category) => (
              <button
                key={category.id}
                data-category={category.id}
                className={`category-btn ${
                  activeCategory === category.id ? "active" : ""
                }`}
                onClick={() => scrollToCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title={t.viewModes.grid}
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title={t.viewModes.list}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <main className="menu-sections">
        {categories.map((category) => {
          const categoryItems =
            category.id === "all"
              ? menuItems
              : menuItems.filter((item) => item.category === category.id);

          if (categoryItems.length === 0) return null;

          return (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className="category-section"
            >
              <h2 className="category-title">
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </h2>
              <div className={`menu-grid ${viewMode}`}>
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="menu-item"
                    onClick={() => openModal(item)}
                  >
                    <div className="item-image">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                      />
                    </div>
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-footer">
                        <span className="item-price">
                          {t.currency}
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-image">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
              />
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{selectedItem.name}</h2>
              <p className="modal-description">{selectedItem.description}</p>
              <div className="modal-price">
                {t.currency}
                {selectedItem.price}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantWebsiteoriginal;
