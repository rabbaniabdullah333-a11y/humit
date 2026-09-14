/**
 * Humi's Home Kitchen - Dynamic Product Detail Page Logic (product.js)
 * "Homemade Taste, Made with Love."
 * 
 * Dynamically reads ?id=<dish-id> from URL query parameters,
 * renders all product details, handles portion selection, quantity changes,
 * cart integration, Buy Now, direct WhatsApp ordering, video player,
 * and related dishes.
 */

document.addEventListener("DOMContentLoaded", () => {
  initProductPage();
});

function initProductPage() {
  // 1. Get Product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // 2. Find Item in MENU_DATA
  if (!window.MENU_DATA || !window.MENU_DATA.length) {
    console.error("MENU_DATA is not loaded.");
    return;
  }

  let item = window.MENU_DATA.find(i => i.id === productId);

  // Fallback to first item if invalid ID
  if (!item) {
    item = window.MENU_DATA[0];
  }

  // 3. State for current dish
  const state = {
    item: item,
    selectedSize: item.sizes ? "half" : "",
    quantity: 1,
    get currentPrice() {
      if (this.item.sizes && this.selectedSize) {
        return this.item.sizes[this.selectedSize];
      }
      return this.item.price;
    }
  };

  // 4. Update Document Title & Metadata
  document.title = `${item.name} | Humi’s Home Kitchen | Fresh Homemade Pakistani Food`;

  // 5. Render All Sections
  renderBreadcrumbs(item);
  renderProductMedia(item);
  renderProductDetails(state);
  renderVideoSection(item);
  renderRelatedDishes(item);

  // 6. Initialize Global Components (Navbar, Cart Drawer, Modals)
  if (typeof initNavbar === "function") initNavbar();
  if (typeof initCartDrawer === "function") initCartDrawer();
  if (typeof initOrderModal === "function") initOrderModal();
  if (typeof initBackToTop === "function") initBackToTop();
}

/**
 * Render Breadcrumb Navigation
 */
function renderBreadcrumbs(item) {
  const container = document.getElementById("product-breadcrumbs");
  if (!container) return;

  container.innerHTML = `
    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
    <li class="breadcrumb-separator">›</li>
    <li class="breadcrumb-item"><a href="index.html#menu">Our Menu</a></li>
    <li class="breadcrumb-separator">›</li>
    <li class="breadcrumb-item"><a href="index.html#menu" onclick="localStorage.setItem('filterCat', '${item.category}')">${item.category}</a></li>
    <li class="breadcrumb-separator">›</li>
    <li class="breadcrumb-item active" aria-current="page">${item.name}</li>
  `;
}

/**
 * Render Media Column (Image, Badges, Prep Time)
 */
function renderProductMedia(item) {
  const imgEl = document.getElementById("product-img");
  const catPill = document.getElementById("product-cat-pill");
  const badgeWrap = document.getElementById("product-badge-wrap");
  const prepEl = document.getElementById("product-prep-badge");

  if (imgEl) {
    imgEl.src = item.image;
    imgEl.alt = item.imageAlt || item.name;
    imgEl.onerror = function() {
      this.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
    };
  }

  if (catPill) {
    catPill.textContent = item.category;
  }

  if (badgeWrap) {
    if (item.isPreOrder) {
      badgeWrap.innerHTML = `<span class="card-badge badge-preorder">⚡ Pre-Order Recommended</span>`;
    } else if (item.badge) {
      badgeWrap.innerHTML = `<span class="card-badge badge-standard">${item.badge}</span>`;
    } else {
      badgeWrap.innerHTML = `<span class="card-badge badge-standard">Freshly Cooked</span>`;
    }
  }

  if (prepEl) {
    prepEl.textContent = `⏱️ ${item.prepTime || "Freshly Cooked"}`;
  }
}

/**
 * Render Product Info, Portion Selectors & Action Buttons
 */
function renderProductDetails(state) {
  const item = state.item;

  // Title & Descriptions
  const titleEl = document.getElementById("product-title");
  const servingSubEl = document.getElementById("product-serving-sub");
  const descEl = document.getElementById("product-desc");
  const specsEl = document.getElementById("product-specs-alert");
  const portionSec = document.getElementById("product-portion-section");
  const priceCurrentEl = document.getElementById("product-price-current");
  const priceNoteEl = document.getElementById("product-price-note");

  if (titleEl) titleEl.textContent = item.name;
  if (descEl) descEl.textContent = item.description;

  // Specs alert (e.g. 1 kg rice + 1 kg beef)
  if (specsEl) {
    if (item.portionDetail) {
      specsEl.style.display = "flex";
      specsEl.innerHTML = `<span>⚖️</span> <strong>Specifications:</strong> ${item.portionDetail}`;
    } else {
      specsEl.style.display = "none";
    }
  }

  // Update Price & Subtitle Helper
  const updatePriceDisplay = () => {
    if (priceCurrentEl) {
      priceCurrentEl.textContent = `Rs. ${state.currentPrice.toLocaleString("en-PK")}`;
    }

    if (item.sizes) {
      const servingLabel = item.servingDescriptions 
        ? item.servingDescriptions[state.selectedSize] 
        : (state.selectedSize === "half" ? "Half Portion" : "Full Portion");
      if (servingSubEl) servingSubEl.textContent = `Portion: ${servingLabel}`;
      if (priceNoteEl) priceNoteEl.textContent = `(${servingLabel})`;
    } else {
      if (servingSubEl) servingSubEl.textContent = item.serving || "Standard Homemade Portion";
      if (priceNoteEl) priceNoteEl.textContent = `(${item.serving || "Standard Portion"})`;
    }
  };

  // Portion Selector HTML
  if (portionSec) {
    if (item.sizes) {
      portionSec.style.display = "block";
      const halfPrice = item.sizes.half;
      const fullPrice = item.sizes.full;
      const halfDesc = item.servingDescriptions ? item.servingDescriptions.half : "Ideal for 1-2 Persons";
      const fullDesc = item.servingDescriptions ? item.servingDescriptions.full : "Family Sharing (3-4 Persons)";

      portionSec.innerHTML = `
        <label class="portion-section-label">Select Portion Size:</label>
        <div class="portion-options-grid">
          <div class="portion-option-card ${state.selectedSize === 'half' ? 'selected' : ''}" data-size="half">
            <span class="portion-opt-title">Half Portion</span>
            <span class="portion-opt-price">Rs. ${halfPrice.toLocaleString("en-PK")}</span>
            <span class="portion-opt-desc">${halfDesc}</span>
          </div>
          <div class="portion-option-card ${state.selectedSize === 'full' ? 'selected' : ''}" data-size="full">
            <span class="portion-opt-title">Full Portion</span>
            <span class="portion-opt-price">Rs. ${fullPrice.toLocaleString("en-PK")}</span>
            <span class="portion-opt-desc">${fullDesc}</span>
          </div>
        </div>
      `;

      // Click event for portion options
      portionSec.querySelectorAll(".portion-option-card").forEach(card => {
        card.addEventListener("click", () => {
          portionSec.querySelectorAll(".portion-option-card").forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");
          state.selectedSize = card.dataset.size;
          updatePriceDisplay();
        });
      });
    } else {
      portionSec.style.display = "none";
    }
  }

  updatePriceDisplay();

  // Quantity Stepper
  const qtyValEl = document.getElementById("product-qty-val");
  const qtyDecBtn = document.getElementById("product-qty-dec");
  const qtyIncBtn = document.getElementById("product-qty-inc");

  if (qtyDecBtn && qtyIncBtn && qtyValEl) {
    qtyDecBtn.onclick = () => {
      if (state.quantity > 1) {
        state.quantity--;
        qtyValEl.textContent = state.quantity;
      }
    };

    qtyIncBtn.onclick = () => {
      if (state.quantity < 50) {
        state.quantity++;
        qtyValEl.textContent = state.quantity;
      }
    };
  }

  // --- BUTTON ACTIONS ---

  // 1. Add to Cart Button
  const btnAddCart = document.getElementById("btn-detail-add-cart");
  if (btnAddCart) {
    btnAddCart.onclick = () => {
      if (window.cart) {
        window.cart.addItem(state.item, state.selectedSize, state.quantity);
        
        // Micro-interaction
        btnAddCart.classList.add("btn-pop");
        const originalText = btnAddCart.innerHTML;
        btnAddCart.innerHTML = `<span>✓</span> Added to Basket!`;
        btnAddCart.style.background = "var(--color-green-soft)";

        if (typeof showToast === "function") {
          showToast(`Added ${state.quantity}x ${item.name} to basket!`);
        }

        setTimeout(() => {
          btnAddCart.classList.remove("btn-pop");
          btnAddCart.innerHTML = originalText;
          btnAddCart.style.background = "";
        }, 1200);
      }
    };
  }

  // 2. Buy Now Button (Instant Cart + Checkout Modal)
  const btnBuyNow = document.getElementById("btn-detail-buy-now");
  if (btnBuyNow) {
    btnBuyNow.onclick = () => {
      if (window.cart && window.whatsappManager) {
        window.cart.addItem(state.item, state.selectedSize, state.quantity);
        // Open order modal for fast checkout
        window.whatsappManager.openOrderModal("cart");
      }
    };
  }

  // 3. Direct Order on WhatsApp Button
  const btnWhatsApp = document.getElementById("btn-detail-whatsapp");
  if (btnWhatsApp) {
    btnWhatsApp.onclick = () => {
      if (window.whatsappManager) {
        window.whatsappManager.orderSingleItemDirect(state.item, state.selectedSize, state.quantity);
      } else {
        // Direct wa.me fallback
        const sizeLabel = state.selectedSize ? (state.selectedSize === "half" ? "Half" : "Full") : (item.serving || "Standard Portion");
        const total = (state.currentPrice * state.quantity).toLocaleString("en-PK");
        const msg = `Assalam-o-Alaikum Humi’s Home Kitchen,\n\nI would like to order:\nDish: ${item.name}\nPortion: ${sizeLabel}\nQuantity: ${state.quantity}\nTotal: Rs. ${total}\n\nPlease confirm my order.`;
        window.open(`https://wa.me/923155074225?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      }
    };
  }
}

/**
 * Render Video Section & Setup Video Player Controls
 */
function renderVideoSection(item) {
  const container = document.getElementById("video-player-container");
  const video = document.getElementById("product-cooking-video");
  const playBtn = document.getElementById("video-play-btn");

  if (!video || !container) return;

  // Custom play/pause toggle
  const togglePlay = () => {
    if (video.paused || video.ended) {
      video.play();
      container.classList.add("is-playing");
    } else {
      video.pause();
      container.classList.remove("is-playing");
    }
  };

  if (playBtn) {
    playBtn.addEventListener("click", togglePlay);
  }

  video.addEventListener("click", togglePlay);

  video.addEventListener("play", () => container.classList.add("is-playing"));
  video.addEventListener("pause", () => container.classList.remove("is-playing"));
}

/**
 * Render Related Dishes from the same category
 */
function renderRelatedDishes(currentItem) {
  const container = document.getElementById("related-dishes-grid");
  if (!container || !window.MENU_DATA) return;

  // Find other items in the same category
  let related = window.MENU_DATA.filter(i => i.category === currentItem.category && i.id !== currentItem.id);

  // If not enough items in category, add other popular items
  if (related.length < 3) {
    const others = window.MENU_DATA.filter(i => i.id !== currentItem.id && !related.includes(i));
    related = related.concat(others.slice(0, 4 - related.length));
  } else {
    related = related.slice(0, 4);
  }

  container.innerHTML = related.map(item => {
    const hasSizes = !!item.sizes;
    const priceDisplay = hasSizes 
      ? `Rs. ${item.sizes.half.toLocaleString("en-PK")} <small>(Half)</small>` 
      : `Rs. ${item.price.toLocaleString("en-PK")}`;

    const badgeHTML = item.isPreOrder 
      ? `<span class="card-badge badge-preorder">⚡ Pre-Order</span>`
      : (item.badge ? `<span class="card-badge badge-standard">${item.badge}</span>` : "");

    return `
      <article class="food-card" id="card-${item.id}">
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

          <div class="card-price-row">
            <div class="price-display">
              <span class="price-current">${priceDisplay}</span>
              <span class="price-serving">${item.serving || (hasSizes ? "Portion Available" : "Standard Portion")}</span>
            </div>
          </div>

          <a href="product.html?id=${item.id}" class="btn-card-detail">
            <span>👁️</span> View Full Details & Video
          </a>

          <div class="card-actions">
            <button type="button" class="btn btn-primary btn-add-cart" onclick="window.cart.addItem(window.MENU_DATA.find(i=>i.id==='${item.id}'), '${hasSizes ? 'half' : ''}', 1); if(typeof showToast==='function') showToast('Added to basket!');">
              <span class="btn-icon">🛒</span> Add to Cart
            </button>
          </div>

          <button type="button" class="btn btn-whatsapp btn-block btn-direct-wa" onclick="window.whatsappManager.orderSingleItemDirect(window.MENU_DATA.find(i=>i.id==='${item.id}'), '${hasSizes ? 'half' : ''}', 1)">
            <span class="wa-icon">💬</span> Order on WhatsApp
          </button>
        </div>
      </article>
    `;
  }).join("");
}
