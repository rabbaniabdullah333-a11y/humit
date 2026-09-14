/**
 * Humi's Home Kitchen - Main Application Logic
 * Orchestrates menu rendering, filtering, cart drawer, modals, lightbox, and animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMenu();
  initCartDrawer();
  initOrderModal();
  initGalleryLightbox();
  initFAQAccordion();
  initBackToTop();
  initSmoothScroll();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById("main-navbar");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const drawerClose = document.getElementById("drawer-close");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const navLinks = document.querySelectorAll(".nav-link, .drawer-link");

  // Sticky header with glass blur on scroll
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  const openDrawer = () => {
    mobileDrawer.classList.add("is-open");
    drawerBackdrop.classList.add("is-open");
    document.body.classList.add("modal-open");
    mobileToggle.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("is-open");
    drawerBackdrop.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    mobileToggle.setAttribute("aria-expanded", "false");
  };

  if (mobileToggle) mobileToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

  // Close drawer on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });
}

/* ==========================================================================
   2. MENU RENDERING & FILTERING
   ========================================================================== */
let activeCategory = "All";
let searchQuery = "";
// Map to track selected size per card (cardId -> 'half' or 'full')
const cardSizeSelections = {};
// Map to track selected quantity per card (cardId -> number)
const cardQtySelections = {};

function initMenu() {
  renderCategoryTabs();
  renderMenuItems();

  const searchInput = document.getElementById("menu-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderMenuItems();
    });
  }
}

/**
 * Render category navigation buttons
 */
function renderCategoryTabs() {
  const container = document.getElementById("category-tabs");
  if (!container || !window.MENU_CATEGORIES) return;

  container.innerHTML = "";

  window.MENU_CATEGORIES.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `cat-tab-btn ${cat === activeCategory ? "active" : ""}`;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", cat === activeCategory ? "true" : "false");
    btn.dataset.category = cat;
    
    // Add icon / badge count
    const count = cat === "All" 
      ? window.MENU_DATA.length 
      : window.MENU_DATA.filter(item => item.category === cat).length;
    
    btn.innerHTML = `
      <span class="cat-name">${cat}</span>
      <span class="cat-count">${count}</span>
    `;

    btn.addEventListener("click", () => {
      if (activeCategory === cat) return;
      activeCategory = cat;
      
      // Update tab active classes
      document.querySelectorAll(".cat-tab-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Smooth scroll button into view horizontally on mobile
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

      renderMenuItems();
    });

    container.appendChild(btn);
  });
}

/**
 * Filter and render menu cards with category benefit intros.
 * Delegates to animations.js buildCategoryMenuHTML when available,
 * falls back to simple grid rendering.
 */
function renderMenuItems() {
  const grid = document.getElementById("menu-grid");
  const countEl = document.getElementById("filtered-count");
  if (!grid || !window.MENU_DATA) return;

  let filtered = window.MENU_DATA;

  if (activeCategory !== "All") {
    filtered = filtered.filter(item => item.category === activeCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery)
    );
  }

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} authentic dishes`;
  }

  if (filtered.length === 0) {
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

  // Use enhanced renderer from animations.js if available
  if (typeof window.buildCategoryMenuHTML === "function" && !searchQuery) {
    window.buildCategoryMenuHTML(activeCategory, filtered);
  } else {
    // Fallback: simple animated grid
    grid.style.opacity = "0";
    grid.style.transform = "translateY(12px)";
    grid.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    grid.innerHTML = filtered.map(item => createFoodCardHTML(item)).join("");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      grid.style.opacity = "1";
      grid.style.transform = "translateY(0)";
    }));
    attachFoodCardListeners();
  }

  // Notify animations.js to refresh scroll observers
  document.dispatchEvent(new CustomEvent("menu-rendered"));
}

function resetMenuFilter() {
  activeCategory = "All";
  searchQuery = "";
  const searchInput = document.getElementById("menu-search");
  if (searchInput) searchInput.value = "";
  renderCategoryTabs();
  renderMenuItems();
}

/**
 * Builds HTML for an individual food card
 */
function createFoodCardHTML(item) {
  // Expose globally so animations.js can call it
  window.createFoodCardHTML = createFoodCardHTML;
  const hasSizes = !!item.sizes;
  // Default to 'half' if sizes exist and no prior choice
  if (hasSizes && !cardSizeSelections[item.id]) {
    cardSizeSelections[item.id] = "half";
  }
  const currentSize = cardSizeSelections[item.id] || "";
  const currentQty = cardQtySelections[item.id] || 1;

  let priceHTML = "";
  let sizeSelectorHTML = "";

  if (hasSizes) {
    const halfActive = currentSize === "half" ? "active" : "";
    const fullActive = currentSize === "full" ? "active" : "";
    const currentPrice = item.sizes[currentSize];

    sizeSelectorHTML = `
      <div class="portion-selector" role="group" aria-label="Portion size">
        <button type="button" class="portion-btn ${halfActive}" data-card-id="${item.id}" data-size="half">
          <span class="p-label">HALF</span>
          <span class="p-price">Rs. ${item.sizes.half.toLocaleString("en-PK")}</span>
        </button>
        <button type="button" class="portion-btn ${fullActive}" data-card-id="${item.id}" data-size="full">
          <span class="p-label">FULL</span>
          <span class="p-price">Rs. ${item.sizes.full.toLocaleString("en-PK")}</span>
        </button>
      </div>
    `;

    const servingInfo = item.servingDescriptions 
      ? item.servingDescriptions[currentSize] 
      : (currentSize === "half" ? "Half Portion" : "Full Portion");

    priceHTML = `
      <div class="card-price-row">
        <div class="price-display">
          <span class="price-current" id="price-${item.id}">Rs. ${currentPrice.toLocaleString("en-PK")}</span>
          <span class="price-serving" id="serving-${item.id}">${servingInfo}</span>
        </div>
      </div>
    `;
  } else {
    priceHTML = `
      <div class="card-price-row">
        <div class="price-display">
          <span class="price-current">Rs. ${item.price.toLocaleString("en-PK")}</span>
          <span class="price-serving">${item.serving || "Standard Portion"}</span>
        </div>
      </div>
    `;
  }

  // Pre-Order Badge or Custom Badge
  const badgeHTML = item.isPreOrder 
    ? `<span class="card-badge badge-preorder">⚡ Pre-Order Recommended</span>`
    : (item.badge ? `<span class="card-badge badge-standard">${item.badge}</span>` : "");

  return `
    <article class="food-card animate-fade-in" id="card-${item.id}" data-category="${item.category}">
      <div class="card-media">
        <a href="product.html?id=${item.id}" class="card-media-link" aria-label="View details of ${item.name}">
          <img 
            src="${item.image}" 
            alt="${item.imageAlt || item.name}" 
            loading="lazy" 
            class="card-img"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';"
          />
        </a>
        <div class="card-badges">
          <span class="card-cat-tag">${item.category}</span>
          ${badgeHTML}
        </div>
        <div class="card-prep-time">
          <span>⏱️ ${item.prepTime || "Freshly Cooked"}</span>
        </div>
      </div>

      <div class="card-body">
        <div class="card-header">
          <h3 class="card-title">
            <a href="product.html?id=${item.id}" class="card-title-link">${item.name}</a>
          </h3>
        </div>

        <p class="card-desc">${item.description}</p>
        
        ${item.portionDetail ? `<div class="card-spec"><span class="spec-icon">⚖️</span> <strong>Specs:</strong> ${item.portionDetail}</div>` : ""}

        ${sizeSelectorHTML}

        ${priceHTML}

        <a href="product.html?id=${item.id}" class="btn-card-detail">
          <span>👁️</span> View Details & Video
        </a>

        <div class="card-actions">
          <div class="qty-stepper">
            <button type="button" class="qty-btn btn-dec" data-card-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="qty-val" id="qty-${item.id}">${currentQty}</span>
            <button type="button" class="qty-btn btn-inc" data-card-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>

          <button type="button" class="btn btn-primary btn-add-cart" data-card-id="${item.id}">
            <span class="btn-icon">🛒</span> Add to Cart
          </button>
        </div>

        <button type="button" class="btn btn-whatsapp btn-block btn-direct-wa" data-card-id="${item.id}">
          <span class="wa-icon">💬</span> Order on WhatsApp
        </button>
      </div>
    </article>
  `;
}

/**
 * Attach listeners to dynamically created food card buttons
 */
function attachFoodCardListeners() {
  // Expose globally so animations.js can call after dynamic render
  window.attachFoodCardListeners = attachFoodCardListeners;
  // Portion size buttons
  document.querySelectorAll(".portion-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const cardId = btn.dataset.cardId;
      const size = btn.dataset.size;
      cardSizeSelections[cardId] = size;

      const item = window.MENU_DATA.find(i => i.id === cardId);
      if (!item || !item.sizes) return;

      // Update active styling in card
      const card = document.getElementById(`card-${cardId}`);
      if (card) {
        card.querySelectorAll(".portion-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Update price display
        const priceEl = document.getElementById(`price-${cardId}`);
        const servingEl = document.getElementById(`serving-${cardId}`);
        if (priceEl) {
          priceEl.textContent = `Rs. ${item.sizes[size].toLocaleString("en-PK")}`;
        }
        if (servingEl) {
          servingEl.textContent = item.servingDescriptions 
            ? item.servingDescriptions[size] 
            : (size === "half" ? "Half Portion" : "Full Portion");
        }
      }
    });
  });

  // Quantity Steppers
  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cardId = btn.dataset.cardId;
      let qty = cardQtySelections[cardId] || 1;
      if (btn.classList.contains("btn-inc")) {
        qty += 1;
      } else if (btn.classList.contains("btn-dec") && qty > 1) {
        qty -= 1;
      }
      cardQtySelections[cardId] = qty;
      const qtyEl = document.getElementById(`qty-${cardId}`);
      if (qtyEl) qtyEl.textContent = qty;
    });
  });

  // Add to Cart
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const cardId = btn.dataset.cardId;
      const item = window.MENU_DATA.find(i => i.id === cardId);
      if (!item) return;

      const size = item.sizes ? (cardSizeSelections[cardId] || "half") : "";
      const qty = cardQtySelections[cardId] || 1;

      window.cart.addItem(item, size, qty);

      // Reset card quantity back to 1 for next add
      cardQtySelections[cardId] = 1;
      const qtyEl = document.getElementById(`qty-${cardId}`);
      if (qtyEl) qtyEl.textContent = "1";

      // Micro-animation on button
      btn.classList.add("btn-pop");
      setTimeout(() => btn.classList.remove("btn-pop"), 300);
    });
  });

  // Direct Order on WhatsApp
  document.querySelectorAll(".btn-direct-wa").forEach(btn => {
    btn.addEventListener("click", () => {
      const cardId = btn.dataset.cardId;
      const item = window.MENU_DATA.find(i => i.id === cardId);
      if (!item) return;

      const size = item.sizes ? (cardSizeSelections[cardId] || "half") : "";
      const qty = cardQtySelections[cardId] || 1;

      window.whatsappManager.orderSingleItemDirect(item, size, qty);
    });
  });
}

/* ==========================================================================
   3. CART DRAWER & UI SYNC
   ========================================================================== */
function initCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const openBtns = document.querySelectorAll(".open-cart-trigger");
  const closeBtn = document.getElementById("cart-close");
  const clearBtn = document.getElementById("btn-clear-cart");
  const checkoutBtn = document.getElementById("btn-cart-checkout");

  const openCart = () => {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.classList.add("modal-open");
  };

  const closeCart = () => {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  };

  openBtns.forEach(btn => btn.addEventListener("click", openCart));
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (backdrop) backdrop.addEventListener("click", closeCart);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) {
        window.cart.clearCart();
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (window.cart.cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      closeCart();
      window.whatsappManager.openOrderModal("cart");
    });
  }

  // Subscribe cart changes to update badges and drawer UI
  window.cart.subscribe(updateCartUI);
}

function updateCartUI(cartItems) {
  const totalCount = window.cart.getTotalCount();
  const subtotal = window.cart.getSubtotal();
  const deliveryFee = window.cart.getDeliveryFee();
  const grandTotal = window.cart.getGrandTotal();

  // Badges
  document.querySelectorAll(".cart-count-badge").forEach(el => {
    el.textContent = totalCount;
    el.style.display = totalCount > 0 ? "inline-flex" : "none";
  });

  // Floating Cart Bar / Button
  const floatCart = document.getElementById("floating-cart-btn");
  if (floatCart) {
    if (totalCount > 0) {
      floatCart.classList.add("is-visible");
      const floatTotal = document.getElementById("float-cart-total");
      if (floatTotal) floatTotal.textContent = `Rs. ${grandTotal.toLocaleString("en-PK")}`;
    } else {
      floatCart.classList.remove("is-visible");
    }
  }

  // Drawer Items container
  const itemsContainer = document.getElementById("cart-items-container");
  const emptyState = document.getElementById("cart-empty-state");
  const footerEl = document.getElementById("cart-footer");

  if (!itemsContainer) return;

  if (cartItems.length === 0) {
    itemsContainer.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (footerEl) footerEl.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (footerEl) footerEl.style.display = "block";

  itemsContainer.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-title-row">
          <h4 class="cart-item-title">${item.name}</h4>
          <button type="button" class="cart-item-remove" data-key="${item.cartKey}" title="Remove item" aria-label="Remove item">✕</button>
        </div>
        ${item.sizeLabel ? `<span class="cart-item-size">${item.sizeLabel} Portion</span>` : ""}
        <div class="cart-item-price-row">
          <span class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}</span>
          <div class="cart-item-stepper">
            <button type="button" class="cart-step-btn cart-dec" data-key="${item.cartKey}">−</button>
            <span class="cart-step-val">${item.quantity}</span>
            <button type="button" class="cart-step-btn cart-inc" data-key="${item.cartKey}">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  // Update Summary numbers
  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const grandTotalEl = document.getElementById("cart-grand-total");
  const deliveryNoteEl = document.getElementById("cart-delivery-note");

  if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString("en-PK")}`;
  if (deliveryEl) {
    deliveryEl.textContent = deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee.toLocaleString("en-PK")}`;
    if (deliveryFee === 0) deliveryEl.classList.add("free-highlight");
    else deliveryEl.classList.remove("free-highlight");
  }
  if (grandTotalEl) grandTotalEl.textContent = `Rs. ${grandTotal.toLocaleString("en-PK")}`;

  if (deliveryNoteEl) {
    const threshold = (window.CONFIG && window.CONFIG.freeDeliveryThreshold) || 2500;
    if (subtotal < threshold) {
      const remaining = threshold - subtotal;
      deliveryNoteEl.textContent = `💡 Add Rs. ${remaining.toLocaleString("en-PK")} more for FREE Delivery!`;
      deliveryNoteEl.style.display = "block";
    } else {
      deliveryNoteEl.textContent = `🎉 You qualify for FREE Delivery!`;
      deliveryNoteEl.style.display = "block";
    }
  }

  // Bind item controls
  itemsContainer.querySelectorAll(".cart-dec").forEach(btn => {
    btn.addEventListener("click", () => window.cart.decrementItem(btn.dataset.key));
  });
  itemsContainer.querySelectorAll(".cart-inc").forEach(btn => {
    btn.addEventListener("click", () => window.cart.incrementItem(btn.dataset.key));
  });
  itemsContainer.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => window.cart.removeItem(btn.dataset.key));
  });
}

/* ==========================================================================
   4. CHECKOUT / ORDER DETAILS MODAL
   ========================================================================== */
function initOrderModal() {
  const modal = document.getElementById("order-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const form = document.getElementById("customer-order-form");

  if (closeBtn) closeBtn.addEventListener("click", () => window.whatsappManager.closeOrderModal());
  if (cancelBtn) cancelBtn.addEventListener("click", () => window.whatsappManager.closeOrderModal());

  // Close on backdrop click
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        window.whatsappManager.closeOrderModal();
      }
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener("submit", (e) => {
      window.whatsappManager.submitOrder(e);
    });
  }
}

/* ==========================================================================
   5. GALLERY & LIGHTBOX
   ========================================================================== */
const GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=85",
    caption: "Freshly Cooked Chicken Karahi in Traditional Desi Wok"
  },
  {
    src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85",
    caption: "Aromatic Dum Biryani with Golden Aged Basmati & Saffron"
  },
  {
    src: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1200&q=85",
    caption: "Authentic Slow-Simmered Beef Yakhni Pulao"
  },
  {
    src: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=85",
    caption: "Velvety Chicken Boneless Handi Simmered in Clay Pot"
  },
  {
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
    caption: "Traditional Karhi Pakora with Fresh Zeera & Curry Leaf Tarka"
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85",
    caption: "Our Clean, Sanitized, and 100% Hygienic Family Kitchen"
  },
  {
    src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    caption: "Pounded Desi Spices, Whole Garam Masala & Farm Produce"
  },
  {
    src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    caption: "Fresh Colorful Garden Salads & Cooling Accompaniments"
  }
];

let currentLightboxIndex = 0;

function initGalleryLightbox() {
  const galleryGrid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxCap = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!galleryGrid) return;

  // Render gallery
  galleryGrid.innerHTML = GALLERY_ITEMS.map((item, idx) => `
    <div class="gallery-item" data-index="${idx}" tabindex="0" role="button" aria-label="View ${item.caption}">
      <img src="${item.src}" alt="${item.caption}" loading="lazy" class="gallery-img" />
      <div class="gallery-overlay">
        <span class="gallery-zoom-icon">🔍</span>
        <p class="gallery-title">${item.caption}</p>
      </div>
    </div>
  `).join("");

  const showLightbox = (index) => {
    currentLightboxIndex = (index + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    const item = GALLERY_ITEMS[currentLightboxIndex];
    if (lightboxImg) lightboxImg.src = item.src;
    if (lightboxCap) lightboxCap.textContent = item.caption;
    lightbox.classList.add("is-active");
    document.body.classList.add("modal-open");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-active");
    document.body.classList.remove("modal-open");
  };

  galleryGrid.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => showLightbox(parseInt(item.dataset.index, 10)));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showLightbox(parseInt(item.dataset.index, 10));
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showLightbox(currentLightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showLightbox(currentLightboxIndex + 1));

  // Close when clicking outside image
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showLightbox(currentLightboxIndex - 1);
    if (e.key === "ArrowRight") showLightbox(currentLightboxIndex + 1);
  });
}

/* ==========================================================================
   6. FAQ ACCORDION (AEO Optimized)
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!trigger || !answer) return;

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Collapse all other FAQs for clean reading
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("is-active");
          const otherTrigger = other.querySelector(".faq-question");
          const otherAnswer = other.querySelector(".faq-answer");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove("is-active");
        trigger.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-active");
        trigger.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ==========================================================================
   7. BACK TO TOP & FLOATING CONTROLS
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("is-visible");
    } else {
      backToTopBtn.classList.remove("is-visible");
    }
  }, { passive: true });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   8. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}
