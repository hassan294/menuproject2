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
  const [isAllergensModalOpen, setIsAllergensModalOpen] = useState(false);
  const breakfastCategoryId = language === "ar" ? "وجبات_الفطور" : "breakfast";
  const allergensData = {
    en: [
      { name: "Nuts", description: "Such as cashews, pistachios and others" },
      { name: "Bean", description: "Such as black and kidney beans" },
      { name: "Dairy", description: "Such as milk, cheese and yogurt" },
      { name: "Eggs", description: "Such as cake and scrambled eggs" },
      {
        name: "Seed",
        description: "Such as sesame, sunflower, and pumpkin seeds",
      },
      { name: "Wheat", description: "Such as bread, pasta, flour" },
    ],
    ar: [
      { name: "مكسرات", description: "مثل الفستق، الكاجو والبندق" },
      { name: "فول", description: "مثل الفول او الفاصولياء السوداء" },
      { name: "ألبان", description: "مثل الحليب، الجبنة والزبادي" },
      { name: "بيض", description: "مثل الكيك والبيض المخفوق" },
      {
        name: "حب",
        description: "مثل السمسم، بذور دوار الشمس، وبذور اليقطين أو القرع",
      },
      { name: "قمح", description: "مثل الخبز، المعكرونة، الدقيق" },
    ],
  };

  // refs for debouncing and latest flag access inside listeners
  const scrollEndTimeoutRef = useRef(null);
  const scrollingManuallyRef = useRef(scrollingManually);

  useEffect(() => {
    scrollingManuallyRef.current = scrollingManually;
  }, [scrollingManually]);

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

  const arabicCategoryNames = {
    breakfast: "إفطار",
    group_offers: "عروض المجموعة",
    manakish: "مناقيش",
    sweets_and_cell: "حلويات وسيل",
    samosa_and_its_derivatives: "سمبوسة ومشتقاتها",
    tea: "شاي",
    coffee: "قهوة",
    nuts_and_shabura: "مكسرات وشابورة",
    cold_drinks: "مشروبات باردة",
  };

  const popularItems = [
    {
      id: "breakfast_1",
      name: {
        en: "His Liver",
        ar: "كبده",
      },
      description: {
        en: "720 kcal",
        ar: "720 سعرة حرارية",
      },
      price: "22.00",
      image:
        "https://d8aaen7rph5y9.cloudfront.net/app/mediafiles/t_1679855127_cy9e3s/items/_17052203349376774.jpg",
    },
    {
      id: "group_offers_1",
      name: {
        en: "Large Breakfast Meal",
        ar: "وجبة فطور كبيرة محلي",
      },
      description: {
        en: "1375 kcal",
        ar: "1375 سعرة حرارية",
      },
      price: "75.00",
      image:
        "https://d8aaen7rph5y9.cloudfront.net/app/mediafiles/t_1679855127_cy9e3s/items/_16999591418493138.jpg",
    },
    {
      id: "manakish_1",
      name: {
        en: "Eggplant Pie",
        ar: "فطيرة الباذنجان",
      },
      description: {
        en: "280 kcal",
        ar: "280 سعرة حرارية",
      },
      price: "13.00",
      image:
        "https://d8aaen7rph5y9.cloudfront.net/app/mediafiles/t_1679855127_cy9e3s/items/_16999609075054284.jpg",
    },
    {
      id: "sweets_and_cell_1",
      name: {
        en: "Sesame Beehive",
        ar: "خلية نحل سمسم",
      },
      description: {
        en: "300 kcal",
        ar: "300 سعرة حرارية",
      },
      price: "25.00",
      image:
        "https://d8aaen7rph5y9.cloudfront.net/app/mediafiles/t_1679855127_cy9e3s/items/_16999593743283816.jpg",
    },
    {
      id: "samosa_and_its_derivatives_1",
      name: {
        en: "Chicken Samosa",
        ar: "سمبوسة دجاج",
      },
      description: {
        en: "640 kcal",
        ar: "640 سعرة حرارية",
      },
      price: "20.00",
      image:
        "https://d8aaen7rph5y9.cloudfront.net/app/mediafiles/t_1679855127_cy9e3s/items/_17052207494541938.jpg",
    },
    {
      id: "tea_1",
      name: {
        en: "Red Tea Pot",
        ar: "شاي أحمر إبريق",
      },
      description: {
        en: "165 kcal",
        ar: "165 سعرة حرارية",
      },
      price: "24.00",
      image:
        "https://d8aaen7rph5y9.cloudfront.net/app/mediafiles/t_1679855127_cy9e3s/items/_16999597634478924.jpg",
    },
  ];

  const categories = useMemo(() => {
    const iconMap = {
      breakfast: "🥐",
      group_offers: "👥",
      manakish: "🍕",
      sweets_and_cell: "🍰",
      samosa_and_its_derivatives: "🥟",
      tea: "🍵",
      coffee: "☕",
      nuts_and_shabura: "🥜",
      cold_drinks: "🥤",

      // Arabic keys (if your JSON uses Arabic keys)
      وجبات_الفطور: "🥐",
      عروض_الجمعات: "👥",
      المناقيش: "🍕",
      الحلى: "🍰",
      سمبوسه_وخفايف: "🥟",
      الشاي: "🍵",
      القهوة: "☕",
      المشروبات_الباردة: "🥤",
      مكسرات_وكيك: "🥜",
    };

    const categoryMap = new Map();
    menuItems.forEach((item) => {
      if (!categoryMap.has(item.categoryId)) {
        categoryMap.set(item.categoryId, item.categoryName);
      }
    });

    return Array.from(categoryMap.entries()).map(([id, name]) => ({
      id,
      name,
      icon: iconMap[id] || "🍴",
    }));
  }, [menuItems]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScrollMeta = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const socialSection = document.querySelector(".social-section");
      const scrollY = window.scrollY;

      setIsNavbarVisible(scrollY > heroHeight * 0.7);

      if (socialSection) {
        const socialBottom =
          socialSection.offsetTop + socialSection.offsetHeight;
        setIsCategoryBarSticky(scrollY > socialBottom - 60);
      }
    };

    window.addEventListener("scroll", handleScrollMeta, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollMeta);
  }, []);

  // Center a category button in the scroll area
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

  // Robust scroll-based active category detector (replaces IntersectionObserver)
  useEffect(() => {
    const onScrollActive = () => {
      // keep meta updates quick
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }

      // set a short timeout to detect end of scrolling (debounce)
      scrollEndTimeoutRef.current = setTimeout(() => {
        setScrollingManually(false); // allow auto updates after user stops scrolling
      }, 150);

      // If currently doing a manual click-initiated scroll, do not override active category
      if (scrollingManuallyRef.current) return;

      // Determine which category section's center is closest to viewport center
      const sections = categories
        .map((c) => document.getElementById(`category-${c.id}`))
        .filter(Boolean);

      if (sections.length === 0) return;

      const viewportCenter = window.innerHeight / 2;
      let closestEl = null;
      let minDist = Infinity;

      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < minDist) {
          minDist = dist;
          closestEl = el;
        }
      });

      if (closestEl) {
        const id = closestEl.id.replace("category-", "");
        if (id !== activeCategory) {
          setActiveCategory(id);
          // center category button slightly after state set
          setTimeout(() => centerActiveCategory(id), 80);
        }
      }
    };

    window.addEventListener("scroll", onScrollActive, { passive: true });
    // also call once to set initial active
    onScrollActive();

    return () => {
      window.removeEventListener("scroll", onScrollActive);
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [categories, activeCategory]);

  const scrollToCategory = (categoryId) => {
    // when clicking, we want to lock auto updates until scroll settles
    setScrollingManually(true);
    scrollingManuallyRef.current = true;

    setActiveCategory(categoryId);
    setTimeout(() => centerActiveCategory(categoryId), 100);

    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const navbar = document.querySelector(".sticky-navbar");
      const categoryBar = document.querySelector(".category-bar");

      const navbarHeight = navbar?.offsetHeight || 0;
      const categoryBarHeight = categoryBar?.offsetHeight || 0;

      const totalOffset = navbarHeight + categoryBarHeight;

      // smooth scroll to the section taking sticky heights into account
      window.scrollTo({
        top: element.offsetTop - totalOffset,
        behavior: "smooth",
      });
    }

    // set a safe timeout fallback in case scroll events/debounce miss it
    if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    scrollEndTimeoutRef.current = setTimeout(() => {
      setScrollingManually(false);
      scrollingManuallyRef.current = false;
    }, 700); // give time for smooth scroll to complete
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
    document.dir = language === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    // initial active category
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
      centerActiveCategory(categories[0].id);
    }
  }, [categories]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div
      className={`restaurant-app ${language}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <nav className={`sticky-navbar ${isNavbarVisible ? "visible" : ""}`}>
        <div className="navbar-content">
          <div className="navbar-logo">
            <img
              src={`${process.env.PUBLIC_URL}/achay-logo-removebg-preview.png`}
              alt="Achay Logo"
              style={{
                backgroundColor: "#FFFFFF",
                height: "40px",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="navbar-title">{t.restaurantName}</div>
          <div className="navbar-actions">
            <button className="language-toggle" onClick={toggleLanguage}>
              {language === "ar" ? "EN" : "عربی"}
            </button>
          </div>
        </div>
      </nav>

      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img
            src={`${process.env.PUBLIC_URL}/heroImage.jpg`}
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
            onClick={() => scrollToCategory(breakfastCategoryId)}
          >
            {t.exploreMenu}
          </button>
        </div>
      </section>

      <section className="social-section">
        <p className="follow-text">{t.followUs}</p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/achay_tea1/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://tiktok.com/@achay_tea1"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon tiktok"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.snapchat.com/add/JZlEucg1/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon snapchat"
          >
            <FaSnapchatGhost />
          </a>
          <a
            href="https://wa.me/+966506185545"
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
            href="https://twitter.com/achay_tea1"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://maps.app.goo.gl/ysE4bW8YZcCaGhTV6"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon location"
          >
            <FaMapMarkerAlt />
          </a>
          <a
            href="//achay.co"
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
      <section className="popular-section">
        <h2 className="category-title">
          ⭐ {language === "ar" ? "الأكثر طلباً" : "Popular"}
        </h2>
        <div className="popular-grid">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="menu-item"
              onClick={() => openModal(item)}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name[language]} />
              </div>
              <div className="item-info">
                <h3 className="item-name">{item.name[language]}</h3>
                <p className="item-description">{item.description[language]}</p>
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
                        {item.calories && item.calories !== "N/A" && (
                          <span>{item.calories}</span>
                        )}
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
        <div className="allergens-button-container">
          <button
            className="allergens-button"
            onClick={() => setIsAllergensModalOpen(true)}
          >
            {language === "ar"
              ? "المسببات الغذائية ومصادر الطعام"
              : "Allergens & Food Sources"}
          </button>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="follow-text" style={{ color: "white" }}>
            {t.followUs}
          </p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/achay_tea1/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/@achay_tea1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon tiktok"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.snapchat.com/add/JZlEucg1/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon snapchat"
            >
              <FaSnapchatGhost />
            </a>
            <a
              href="https://wa.me/+966506185545"
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
              href="https://twitter.com/achay_tea1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://maps.app.goo.gl/ysE4bW8YZcCaGhTV6"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon location"
            >
              <FaMapMarkerAlt />
            </a>
            <a
              href="//achay.co"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon website"
            >
              <FaGlobe />
            </a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} Achay. All rights reserved.
          </p>
        </div>
      </footer>

      {isAllergensModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAllergensModalOpen(false)}
        >
          <div
            className={`modal-content ${language === "ar" ? "rtl" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsAllergensModalOpen(false)}
            >
              ×
            </button>
            <h2 className="modal-title">
              {language === "ar"
                ? "المسببات الغذائية ومصادر الطعام"
                : "Allergens & Food Sources"}
            </h2>
            <ul className="allergens-list">
              {allergensData[language].map((allergen, index) => (
                <li key={index} className="allergen-item">
                  <h6 className="allergen-name">{allergen.name}</h6>
                  <p className="allergen-description">{allergen.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isModalOpen && selectedItem && (
        <div className="modal-overlayforItems" onClick={handleModalClick}>
          <div className="modal-contentforItems">
            <button className="modal-closeforItems" onClick={closeModal}>
              ×
            </button>
            <div className="modal-image">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
              />
            </div>
            <div className="modal-info">
              <h2 className="modal-title">
                {typeof selectedItem.name === "object"
                  ? selectedItem.name[language]
                  : selectedItem.name}
              </h2>

              <p className="modal-description">
                {selectedItem.calories && selectedItem.calories !== "N/A"
                  ? selectedItem.calories
                  : ""}
              </p>

              <p className="modal-description">
                {typeof selectedItem.description === "object"
                  ? selectedItem.description[language]
                  : selectedItem.description}
              </p>

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
