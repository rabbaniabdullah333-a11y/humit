/**
 * Humi's Home Kitchen - WhatsApp Ordering & Message Generator
 * Formats structured WhatsApp messages, manages customer details, and redirects to WhatsApp.
 */

class WhatsAppOrderManager {
  constructor() {
    this.phone = window.WHATSAPP_NUMBER || "923155074225";
    this.storageKey = (window.CONFIG && window.CONFIG.storageKeys.customer) || "humis_kitchen_customer_v1";
    this.savedCustomer = this.loadCustomerInfo();
    this.pendingSingleOrder = null;
  }

  loadCustomerInfo() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {
        name: "",
        phone: "",
        address: "",
        city: "Islamabad",
        notes: ""
      };
    } catch (e) {
      return { name: "", phone: "", address: "", city: "Islamabad", notes: "" };
    }
  }

  saveCustomerInfo(customerData) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(customerData));
      this.savedCustomer = customerData;
    } catch (e) {
      console.error("Failed to save customer details", e);
    }
  }

  /**
   * Generates clean WhatsApp URL.
   */
  getWhatsAppUrl(message) {
    const cleanPhone = this.phone.replace(/[^0-9]/g, "");
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }

  /**
   * Opens WhatsApp directly in new window or native app.
   */
  sendWhatsAppMessage(message) {
    const url = this.getWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  /**
   * Prepares a single-item direct WhatsApp order.
   * If customer details are needed, opens the modal with the item locked in.
   */
  orderSingleItemDirect(item, size = "", quantity = 1) {
    let itemPrice = item.price;
    let sizeLabel = "";

    if (item.sizes && size) {
      itemPrice = item.sizes[size];
      sizeLabel = size === "half" ? "Half" : "Full";
    }

    this.pendingSingleOrder = {
      item,
      size,
      sizeLabel,
      quantity,
      price: itemPrice
    };

    // Open checkout modal in single-item mode
    this.openOrderModal("single");
  }

  /**
   * Builds the formatted WhatsApp message for a single item order.
   */
  buildSingleItemMessage(orderData, customer) {
    const formattedPrice = `Rs. ${Number(orderData.price * orderData.quantity).toLocaleString("en-PK")}`;
    
    let message = `Assalam-o-Alaikum Humi’s Home Kitchen,\n\n`;
    message += `I would like to place an order:\n\n`;
    message += `Item: ${orderData.item.name}\n`;
    if (orderData.sizeLabel) {
      message += `Size: ${orderData.sizeLabel}\n`;
    } else if (orderData.item.serving) {
      message += `Portion: ${orderData.item.serving}\n`;
    }
    message += `Quantity: ${orderData.quantity}\n`;
    message += `Price: ${formattedPrice}\n\n`;
    message += `Please confirm my order.\n\n`;
    message += `Name: ${customer.name || ""}\n`;
    message += `Phone: ${customer.phone || ""}\n`;
    message += `Address: ${customer.address || ""}\n`;
    message += `City: ${customer.city || "Islamabad"}\n`;
    message += `Special Instructions: ${customer.notes || "None"}\n`;

    return message;
  }

  /**
   * Builds the formatted WhatsApp message for a full cart order.
   */
  buildCartOrderMessage(cartItems, customer) {
    let message = `Assalam-o-Alaikum Humi’s Home Kitchen,\n\n`;
    message += `I would like to place an order:\n\n`;
    message += `Order Items:\n`;

    cartItems.forEach((entry, idx) => {
      const sizeText = entry.sizeLabel ? ` (${entry.sizeLabel})` : "";
      const priceFormatted = `Rs. ${(entry.price * entry.quantity).toLocaleString("en-PK")}`;
      message += `${idx + 1}. ${entry.name}${sizeText} x ${entry.quantity} — ${priceFormatted}\n`;
    });

    const subtotal = window.cart.getSubtotal();
    const deliveryFee = window.cart.getDeliveryFee();
    const grandTotal = window.cart.getGrandTotal();

    message += `\nSubtotal: Rs. ${subtotal.toLocaleString("en-PK")}\n`;
    message += `Delivery Charges: ${deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee.toLocaleString("en-PK")}`}\n`;
    message += `Total: Rs. ${grandTotal.toLocaleString("en-PK")}\n\n`;

    message += `Customer Details:\n`;
    message += `Name: ${customer.name || ""}\n`;
    message += `Phone: ${customer.phone || ""}\n`;
    message += `Address: ${customer.address || ""}\n`;
    message += `City: ${customer.city || "Islamabad"}\n`;
    message += `Special Instructions: ${customer.notes || "None"}\n\n`;

    message += `Please confirm my order.`;

    return message;
  }

  /**
   * Opens the Order Details Modal.
   * mode: "cart" or "single"
   */
  openOrderModal(mode = "cart") {
    const modal = document.getElementById("order-modal");
    if (!modal) return;

    // Pre-populate with saved info
    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const addressInput = document.getElementById("customer-address");
    const cityInput = document.getElementById("customer-city");
    const notesInput = document.getElementById("customer-notes");

    if (nameInput) nameInput.value = this.savedCustomer.name || "";
    if (phoneInput) phoneInput.value = this.savedCustomer.phone || "";
    if (addressInput) addressInput.value = this.savedCustomer.address || "";
    if (cityInput && this.savedCustomer.city) cityInput.value = this.savedCustomer.city;
    if (notesInput) notesInput.value = this.savedCustomer.notes || "";

    // Update order summary inside modal
    const summaryContainer = document.getElementById("modal-order-summary");
    if (summaryContainer) {
      if (mode === "single" && this.pendingSingleOrder) {
        const item = this.pendingSingleOrder;
        const total = item.price * item.quantity;
        summaryContainer.innerHTML = `
          <div class="modal-summary-card">
            <div class="modal-summary-header">
              <span class="badge-accent">Direct WhatsApp Order</span>
            </div>
            <div class="modal-summary-row">
              <strong>${item.item.name} ${item.sizeLabel ? `(${item.sizeLabel})` : ""}</strong>
              <span>Qty: ${item.quantity}</span>
            </div>
            <div class="modal-summary-total">
              <span>Item Total:</span>
              <span class="price-highlight">Rs. ${total.toLocaleString("en-PK")}</span>
            </div>
            <small class="text-muted">+ Standard delivery fee confirmed upon address verification.</small>
          </div>
        `;
      } else {
        const count = window.cart.getTotalCount();
        const total = window.cart.getGrandTotal();
        summaryContainer.innerHTML = `
          <div class="modal-summary-card">
            <div class="modal-summary-header">
              <span class="badge-accent">Cart Checkout (${count} item${count > 1 ? "s" : ""})</span>
            </div>
            <div class="modal-summary-total">
              <span>Grand Total:</span>
              <span class="price-highlight">Rs. ${total.toLocaleString("en-PK")}</span>
            </div>
          </div>
        `;
      }
    }

    modal.dataset.mode = mode;
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Auto-focus first empty field
    if (nameInput && !nameInput.value) {
      setTimeout(() => nameInput.focus(), 150);
    }
  }

  /**
   * Closes the Order Details Modal.
   */
  closeOrderModal() {
    const modal = document.getElementById("order-modal");
    if (!modal) return;
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    this.pendingSingleOrder = null;
  }

  /**
   * Submits order from modal: validates, formats message, saves details, opens WhatsApp.
   */
  submitOrder(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    const addressInput = document.getElementById("customer-address");
    const cityInput = document.getElementById("customer-city");
    const notesInput = document.getElementById("customer-notes");

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const city = cityInput ? cityInput.value.trim() : "Islamabad";
    const notes = notesInput ? notesInput.value.trim() : "";

    // Validation
    if (!name) {
      alert("Please enter your full name.");
      nameInput.focus();
      return;
    }
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone or WhatsApp number.");
      phoneInput.focus();
      return;
    }
    if (!address) {
      alert("Please provide your delivery address.");
      addressInput.focus();
      return;
    }

    const customerData = { name, phone, address, city, notes };
    this.saveCustomerInfo(customerData);

    const modal = document.getElementById("order-modal");
    const mode = modal ? modal.dataset.mode : "cart";

    let message = "";
    if (mode === "single" && this.pendingSingleOrder) {
      message = this.buildSingleItemMessage(this.pendingSingleOrder, customerData);
    } else {
      if (window.cart.cart.length === 0) {
        alert("Your cart is empty! Please add some dishes first.");
        this.closeOrderModal();
        return;
      }
      message = this.buildCartOrderMessage(window.cart.cart, customerData);
    }

    this.sendWhatsAppMessage(message);
    this.closeOrderModal();

    // If it was cart order, optionally offer to clear or keep cart
    if (mode === "cart") {
      window.cart.showToast("Order launched in WhatsApp! Confirm with Humi's Kitchen.");
    }
  }
}

// Global instance
const whatsappManager = new WhatsAppOrderManager();
window.whatsappManager = whatsappManager;
