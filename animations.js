/**
 * Humi's Home Kitchen — Premium Animations Engine
 * Handles: loading screen, scroll reveals, parallax, cart micro-interactions,
 *          category filter transitions, and category benefit section rendering.
 */

/* ============================================================
   CATEGORY BENEFIT DATA
   ============================================================ */
const CATEGORY_META = {
  "All": null, // "All" has no intro section
  "Sandwiches": {
    emoji: "🥪",
    bgClass: "cat-bg-sandwiches",
    eyebrow: "SANDWICHES",
    heading: "Fresh, Delicious & Perfect for Every Craving",
    description: "Enjoy freshly prepared sandwiches made with quality ingredients and delicious homemade flavors. A perfect choice for a quick, satisfying and flavorful meal.",
    benefits: ["Fresh Ingredients", "Homemade Flavors", "Quick & Satisfying"],
    tagline: "Freshly Prepared • Delicious • Homemade",
    isPreOrder: false
  },
  "Macaroni": {
    emoji: "🍝",
    bgClass: "cat-bg-macaroni",
    eyebrow: "MACARONI",
    heading: "Creamy, Comforting & Full of Flavor",
    description: "Enjoy delicious homemade macaroni prepared with carefully selected ingredients and a rich, satisfying taste that makes every bite comforting.",
    benefits: ["Rich & Creamy", "Freshly Made", "Comfort Food"],
    tagline: "Comfort Food • Freshly Made • Homemade Taste",
    isPreOrder: false
  },
  "Chicken": {
    emoji: "🍗",
    bgClass: "cat-bg-chicken",
    eyebrow: "CHICKEN",
    heading: "Rich Flavors, Tender Chicken & Traditional Homemade Taste",
    description: "Our chicken dishes are freshly prepared with carefully selected ingredients and traditional spices, bringing authentic homemade flavor to every meal.",
    benefits: ["Fresh Chicken", "Traditional Spices", "Homemade Flavor"],
    tagline: "Fresh Chicken • Traditional Spices • Homemade Flavor",
    isPreOrder: false
  },
  "Rice": {
    emoji: "🍚",
    bgClass: "cat-bg-rice",
    eyebrow: "RICE",
    heading: "Traditional Rice Dishes Made for Every Occasion",
    description: "From flavorful biryani to aromatic pulao, our rice dishes are prepared with quality ingredients and homemade techniques for a rich and satisfying meal.",
    benefits: ["Aromatic Basmati", "Rich Flavor", "Family Portions"],
    tagline: "Fragrant • Flavorful • Freshly Prepared",
    isPreOrder: false
  },
  "Salads": {
    emoji: "🥗",
    bgClass: "cat-bg-salads",
    eyebrow: "SALADS",
    heading: "Fresh, Light & Naturally Refreshing",
    description: "Add freshness and balance to your meal with our selection of fresh and flavorful salads, prepared with quality ingredients and crisp garden produce.",
    benefits: ["Fresh Ingredients", "Light & Healthy", "Prepared Fresh"],
    tagline: "Fresh • Light • Colorful • Delicious",
    isPreOrder: false
  },
  "Special Order": {
    emoji: "⭐",
    bgClass: "cat-bg-special",
    eyebrow: "SPECIAL ORDER",
    heading: "Special Homemade Dishes Made for Special Moments",
    description: "Discover our special-order dishes, prepared with extra care and traditional homemade flavors. Perfect for family gatherings, guests and special occasions.",
    benefits: ["Specially Prepared", "Slow Cooked", "Heirloom Recipes"],
    tagline: "Specially Prepared • Homemade • Pre-Order Recommended",
    isPreOrder: true
  },
  "Vegetables & Daal": {
    emoji: "🥬",
    bgClass: "cat-bg-veg",
    eyebrow: "VEGETABLES & DAAL",
    heading: "Simple, Wholesome & Comforting Homemade Food",
    description: "Enjoy traditional vegetables and daal dishes prepared with simple ingredients and authentic homemade cooking techniques. Pure comfort, every serving ½ Kg.",
    benefits: ["Farm Vegetables", "Traditional Tadka", "Wholesome & Pure"],
    tagline: "Wholesome • Traditional • Homemade",
    isPreOrder: false
  },
  "Chutneys": {
    emoji: "🫙",
    bgClass: "cat-bg-chutneys",
    eyebrow: "CHUTNEYS",
    heading: "The Perfect Flavor Boost for Every Meal",
    description: "Add an extra burst of flavor to your favorite homemade dishes with our selection of fresh and delicious chutneys, ground daily from natural ingredients.",
    benefits: ["Ground Fresh Daily", "Pure Ingredients", "Bold Flavors"],
    tagline: "Fresh • Flavorful • Perfectly Paired",
    isPreOrder: false
  },
  "Raitas": {
    emoji: "🥛",
    bgClass: "cat-bg-raitas",
    eyebrow: "RAITAS",
    heading: "Cool, Creamy & Refreshingly Delicious",
    description: "Complete your meal with smooth and refreshing homemade raitas prepared to perfectly complement spicy and flavorful dishes. Each serving ½ Kg.",
    benefits: ["Farm Fresh Yogurt", "Cooling & Light", "Perfect Pairing"],
    tagline: "Cool • Creamy • Fresh",
    isPreOrder: false
  }
};

/* ============================================================
   BUILD CATEGORY INTRO HTML
   ============================================================ */
function buildCategoryIntroHTML(meta) {
  if (!meta) return "";

  const benefitPills = meta.benefits.map(b =>
    `<span class="cat-benefit-pill"><span>✓</span> ${b}</span>`
  ).join("");

  const preOrderBanner = meta.isPreOrder
    ? `<div class="preorder-banner" style="margin-bottom:0.75rem;">⚡ PRE-ORDER RECOMMENDED</div>`
    : "";

  return `
    <div class="cat-intro-section ${meta.bgClass}" data-reveal="fade-up">
      <div class="container">
        <div class="cat-intro-inner">
          <div class="cat-intro-visual" data-reveal="scale-in" data-delay="100">
            <div class="cat-emoji">${meta.emoji}</div>
            <div class="cat-intro-divider"></div>
          </div>
          <div class="cat-intro-text" data-reveal="slide-left" data-delay="150">
            ${preOrderBanner}
            <span class="cat-eyebrow">${meta.eyebrow}</span>
            <h3 class="cat-heading">${meta.heading}</h3>
            <p class="cat-description">${meta.description}</p>
            <div class="cat-benefits">${benefitPills}</div>
            <div class="cat-tagline">${meta.tagline}</div>
          </div>
        </div>
        <div class="cat-connector">
          <div class="cat-connector-line"></div>
          <div class="cat-connector-dot"></div>
          <div class="cat-connector-line" style="background: linear-gradient(to left, var(--color-cream-border), transparent);"></div>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   SCROLL REVEAL — INTERSECTION OBSERVER
   ============================================================ */
let revealObserver = null;

function initScrollReveal() {
  if (typeof IntersectionObserver === "undefined") {
    // Fallback: immediately show everything
    document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-revealed"));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target); // reveal once
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll("[data-reveal]").forEach(el => revealObserver.observe(el));
}

function refreshRevealObserver() {
  if (!revealObserver) return;
  document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach(el => {
    revealObserver.observe(el);
  });
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */
function initLoadingScreen() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  // Wait for page to be interactive
  const hide = () => {
    loader.classList.add("loader-hidden");
    setTimeout(() => loader.remove(), 700);
  };

  if (document.readyState === "complete") {
    setTimeout(hide, 800);
  } else {
    window.addEventListener("load", () => setTimeout(hide, 800));
  }
}

/* ============================================================
   AMBIENT ORBS INJECT
   ============================================================ */
function initAmbientOrbs() {
  const orbs = `
    <div class="ambient-orb ambient-orb-1" aria-hidden="true"></div>
    <div class="ambient-orb ambient-orb-2" aria-hidden="true"></div>
    <div class="ambient-orb ambient-orb-3" aria-hidden="true"></div>
  `;
  document.body.insertAdjacentHTML("afterbegin", orbs);
}

/* ============================================================
   HERO PARTICLES INJECT
   ============================================================ */
function initHeroParticles() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;

  const pc = document.createElement("div");
  pc.className = "hero-particles";
  pc.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("div");
    p.className = "hero-particle";
    pc.appendChild(p);
  }
  hero.insertBefore(pc, hero.firstChild);
}

/* ============================================================
   SUBTLE PARALLAX ON HERO BG
   ============================================================ */
function initParallax() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const hero = document.querySelector(".hero-section");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroH  = hero.offsetHeight;
    if (scrollY > heroH) return;
    const ratio = scrollY / heroH;
    hero.style.backgroundPositionY = `calc(50% + ${ratio * 40}px)`;
  }, { passive: true });
}

/* ============================================================
   ENHANCED ADD-TO-CART MICRO-INTERACTION
   ============================================================ */
function initCartMicroInteractions() {
  // Override cart addItem to trigger visual feedback
  const originalAdd = window.cart.addItem.bind(window.cart);
  window.cart.addItem = function(item, size, qty) {
    originalAdd(item, size, qty);
    triggerCartPop();
  };
}

function triggerCartPop() {
  // Badge bounce
  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.classList.remove("badge-pop");
    void badge.offsetWidth; // reflow
    badge.classList.add("badge-pop");
    setTimeout(() => badge.classList.remove("badge-pop"), 500);
  });

  // Cart icon wiggle
  const cartBtn = document.querySelector(".nav-cart-btn");
  if (cartBtn) {
    cartBtn.classList.remove("cart-wiggle");
    void cartBtn.offsetWidth;
    cartBtn.classList.add("cart-wiggle");
    setTimeout(() => cartBtn.classList.remove("cart-wiggle"), 600);
  }

  // Flash the floating cart
  const floatCart = document.getElementById("floating-cart-btn");
  if (floatCart && floatCart.classList.contains("is-visible")) {
    floatCart.style.transform = "scale(1.08)";
    setTimeout(() => { floatCart.style.transform = ""; }, 300);
  }
}

/* ============================================================
   ENHANCED CATEGORY RENDERING WITH BENEFIT SECTIONS
   ============================================================ */
function buildCategoryMenuHTML(activeCategory, filteredItems) {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  if (filteredItems.length === 0) {
    grid.innerHTML = `
      <div class="menu-empty-state">
        <div class="empty-icon">🍳</div>
        <h3>No dishes found</h3>
        <p>Try a different search or choose another category.</p>
        <button class="btn btn-outline" onclick="resetMenuFilter()">View All Dishes</button>
      </div>
    `;
    return;
  }

  let html = "";

  if (activeCategory === "All") {
    // Group by category and show intro + cards for each
    const categoryOrder = [
      "Sandwiches","Macaroni","Chicken","Rice","Salads",
      "Special Order","Vegetables & Daal","Chutneys","Raitas"
    ];
    categoryOrder.forEach(cat => {
      const catItems = filteredItems.filter(i => i.category === cat);
      if (catItems.length === 0) return;
      const meta = CATEGORY_META[cat];
      html += `<div class="cat-full-section" id="cat-section-${cat.replace(/\s+/g, "-").toLowerCase()}">`;
      html += buildCategoryIntroHTML(meta);
      html += `<div class="container"><div class="food-grid cat-cards-grid">`;
      catItems.forEach(item => {
        html += window.createFoodCardHTML ? window.createFoodCardHTML(item) : "";
      });
      html += `</div></div></div>`;
    });
  } else {
    // Single category — show intro + cards
    const meta = CATEGORY_META[activeCategory];
    html += buildCategoryIntroHTML(meta);
    html += `<div class="container"><div class="food-grid cat-cards-grid">`;
    filteredItems.forEach(item => {
      html += window.createFoodCardHTML ? window.createFoodCardHTML(item) : "";
    });
    html += `</div></div>`;
  }

  // Fade transition
  grid.style.opacity = "0";
  grid.style.transform = "translateY(12px)";
  grid.style.transition = "opacity 0.3s ease, transform 0.3s ease";

  grid.innerHTML = html;

  // Reflow then animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      grid.style.opacity = "1";
      grid.style.transform = "translateY(0)";
    });
  });

  // Refresh scroll reveal for new elements
  setTimeout(() => {
    if (window.refreshRevealObserver) window.refreshRevealObserver();
    if (window.attachFoodCardListeners) window.attachFoodCardListeners();
  }, 50);
}

/* ============================================================
   NAVBAR COMPACT STATE ON SCROLL
   ============================================================ */
function initNavbarScroll() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > 30) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
    lastScroll = y;
  }, { passive: true });
}

/* ============================================================
   SECTION REVEAL — Add data-reveal to key sections
   ============================================================ */
function addRevealAttributes() {
  const selectors = [
    { sel: ".section-header",  rev: "fade-up" },
    { sel: ".why-card",        rev: "fade-up" },
    { sel: ".review-card",     rev: "fade-up" },
    { sel: ".deal-card",       rev: "fade-up" },
    { sel: ".faq-item",        rev: "fade-up" },
    { sel: ".about-grid",      rev: "fade-up" },
    { sel: ".contact-info-card", rev: "slide-right" },
    { sel: ".map-visual-card", rev: "slide-left" },
    { sel: ".footer-brand",    rev: "fade-up" },
    { sel: ".gallery-item",    rev: "scale-in" },
    { sel: ".pillar-item",     rev: "fade-up" },
    { sel: ".announcement-bar", rev: "fade-down" },
  ];

  selectors.forEach(({ sel, rev }) => {
    document.querySelectorAll(sel).forEach((el, idx) => {
      if (!el.hasAttribute("data-reveal")) {
        el.setAttribute("data-reveal", rev);
        if (idx > 0) {
          const delays = [0, 100, 200, 300, 400, 500];
          el.setAttribute("data-delay", delays[idx % delays.length]);
        }
      }
    });
  });
}

/* ============================================================
   EXPOSE GLOBALS
   ============================================================ */
window.buildCategoryMenuHTML = buildCategoryMenuHTML;
window.buildCategoryIntroHTML = buildCategoryIntroHTML;
window.refreshRevealObserver = refreshRevealObserver;
window.triggerCartPop = triggerCartPop;

/* ============================================================
   INIT ALL ANIMATION SYSTEMS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initAmbientOrbs();
  initHeroParticles();
  initParallax();
  initNavbarScroll();

  // Wait slightly for main.js to render menu
  setTimeout(() => {
    addRevealAttributes();
    initScrollReveal();
    initCartMicroInteractions();
  }, 150);
});

// Re-run reveal after dynamic menu renders
document.addEventListener("menu-rendered", () => {
  addRevealAttributes();
  initScrollReveal();
});
