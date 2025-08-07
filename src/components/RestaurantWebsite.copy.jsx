import React, { useState, useEffect, useRef, useMemo } from "react";
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
import data from "../pages/final_menu_data.json";

const RestaurantWebsite = () => {
  const [language, setLanguage] = useState("ar");
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isCategoryBarSticky, setIsCategoryBarSticky] = useState(false);
  const heroRef = useRef(null);
  const categoryBarRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollingManually, setScrollingManually] = useState(false);

  const menuItems = data.menuItems[language];

  const t =
    language === "ar"
      ? {
          restaurantName: "اچاي",
          tagline: "أشهى الأطباق الشرقية",
          exploreMenu: "تصفح القائمة",
          followUs: "تابعنا على مواقع التواصل",
          viewModes: { grid: "عرض شبكي", list: "عرض قائمة" },
          currency: "﷼ ",
        }
      : {
          restaurantName: "Achay",
          tagline: "Delicious Oriental Dishes",
          exploreMenu: "Explore Menu",
          followUs: "Follow us on social media",
          viewModes: { grid: "Grid View", list: "List View" },
          currency: "SAR ",
        };

  // Build categories based on menuItems
  // const categoryMap = new Map();

  // menuItems.forEach((item) => {
  //   if (!categoryMap.has(item.categoryId)) {
  //     categoryMap.set(item.categoryId, item.categoryName);
  //   }
  // });

  // // Now create categories array
  // const categories = [
  //   ...Array.from(categoryMap.entries()).map(([id, name]) => ({
  //     id,
  //     name,
  //     icon: "🍴",
  //   })),
  // ];

  const categories = useMemo(() => {
    const categoryMap = new Map();
    menuItems.forEach((item) => {
      if (!categoryMap.has(item.categoryId)) {
        categoryMap.set(item.categoryId, item.categoryName);
      }
    });

    return Array.from(categoryMap.entries()).map(([id, name]) => ({
      id,
      name,
      icon: "🍴",
    }));
  }, [menuItems]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

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
      rootMargin: "0px 0px -50% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
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

      if (scrollY < heroHeight + socialHeight + 100 && categories.length > 0) {
        setActiveCategory(categories[0].id);
        setTimeout(() => {
          centerActiveCategory(categories[0].id);
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
  // const scrollToCategory = (categoryId) => {
  //   setScrollingManually(true); // prevent observer override
  //   setActiveCategory(categoryId); // apply immediately

  //   setTimeout(() => {
  //     centerActiveCategory(categoryId);
  //   }, 100);

  //   const element = document.getElementById(`category-${categoryId}`);
  //   if (element) {
  //     const offset = isCategoryBarSticky ? 120 : 60;
  //     window.scrollTo({
  //       top: element.offsetTop - offset,
  //       behavior: "smooth",
  //     });
  //   }

  //   // Re-enable observer after a short delay (scroll should be complete)
  //   setTimeout(() => {
  //     setScrollingManually(false);
  //   }, 300); // adjust if needed
  // };

  const scrollToCategory = (categoryId) => {
    setScrollingManually(true);
    setActiveCategory(categoryId);

    setTimeout(() => {
      centerActiveCategory(categoryId);
    }, 100);

    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      // Get the combined height of sticky navbar and category bar
      const navbar = document.querySelector(".sticky-navbar");
      const categoryBar = document.querySelector(".category-bar");

      const navbarHeight = navbar?.offsetHeight || 0;
      const categoryBarHeight = categoryBar?.offsetHeight || 0;

      const totalOffset = navbarHeight + categoryBarHeight;

      window.scrollTo({
        top: element.offsetTop - totalOffset,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setScrollingManually(false);
    }, 500);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
    document.dir = language === "ar" ? "rtl" : "ltr";
  };

  // Add this new useEffect for initial state
  useEffect(() => {
    // Set initial active category to the first real category instead of "all"
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
      centerActiveCategory(categories[0].id);
    }
  }, [categories]);

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
            onClick={() => scrollToCategory("breakfast")}
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
          const categoryItems = menuItems.filter(
            (item) => item.categoryId === category.id
          );

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
                      <p className="item-description">
                        {item.description || ""}
                      </p>
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

export default RestaurantWebsite;
