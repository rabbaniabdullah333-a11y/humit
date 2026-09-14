/**
 * Humi's Home Kitchen - Shopping Cart Logic
 * Manages frontend cart state, localStorage persistence, calculations, and drawer UI.
 */

class CartManager {
  constructor() {
    this.storageKey = (window.CONFIG && window.CONFIG.storageKeys.cart) || "humis_kitchen_cart_v1";
    this.cart = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
      this.notifyListeners();
    } catch (e) {
      console.error("Could not save cart to localStorage", e);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.cart);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.cart));
  }

  /**
   * Generates a unique key for an item including its chosen size.
   */
  getItemKey(itemId, size = "") {
    return size ? `${itemId}-${size}` : `${itemId}`;
  }

  /**
   * Adds an item to the cart.
   * @param {Object} item - Menu item object from MENU_DATA
   * @param {string} size - 'half' or 'full' or ''
   * @param {number} quantity - default 1
   */
  addItem(item, size = "", quantity = 1) {
    const itemKey = this.getItemKey(item.id, size);
    let itemPrice = item.price;
    let sizeLabel = "";

    if (item.sizes && size) {
      itemPrice = item.sizes[size];
      sizeLabel = size === "half" ? "Half" : "Full";
    }

    const existingIndex = this.cart.findIndex(entry => entry.cartKey === itemKey);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        cartKey: itemKey,
        id: item.id,
        name: item.name,
        category: item.category,
        size: size,
        sizeLabel: sizeLabel,
        price: itemPrice,
        quantity: quantity,
        image: item.image,
        serving: size ? (item.servingDescriptions ? item.servingDescriptions[size] : sizeLabel) : (item.serving || "")
      });
    }

    this.saveCart();
    this.showToast(`Added ${item.name}${sizeLabel ? ` (${sizeLabel})` : ""} to cart!`);
  }

  /**
   * Increment item quantity.
   */
  incrementItem(cartKey) {
    const item = this.cart.find(entry => entry.cartKey === cartKey);
    if (item) {
      item.quantity += 1;
      this.saveCart();
    }
  }

  /**
   * Decrement item quantity. If 0, remove.
   */
  decrementItem(cartKey) {
    const index = this.cart.findIndex(entry => entry.cartKey === cartKey);
    if (index > -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
      this.saveCart();
    }
  }

  /**
   * Remove item from cart.
   */
  removeItem(cartKey) {
    this.cart = this.cart.filter(entry => entry.cartKey !== cartKey);
    this.saveCart();
  }

  /**
   * Clears the entire cart.
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.showToast("Cart cleared.");
  }

  /**
   * Get total item count.
   */
  getTotalCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Get subtotal in Rs.
   */
  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Get delivery charges in Rs.
   */
  getDeliveryFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const threshold = (window.CONFIG && window.CONFIG.freeDeliveryThreshold) || 2500;
    const standardFee = (window.CONFIG && window.CONFIG.deliveryFee) || 150;
    return subtotal >= threshold ? 0 : standardFee;
  }

  /**
   * Get grand total in Rs.
   */
  getGrandTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  /**
   * Formatted rupee string e.g. "Rs. 2,400"
   */
  formatCurrency(amount) {
    return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
  }

  /**
   * Displays a non-intrusive floating toast notification.
   */
  showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-item animate-fade-in";
    toast.innerHTML = `
      <span class="toast-icon">✨</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-leaving");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

// Global instance
const cart = new CartManager();
window.cart = cart;
