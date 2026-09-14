/**
 * Humi's Home Kitchen - Global Configuration
 * Single source of truth for business details, WhatsApp, and delivery calculations.
 */

// Configurable WhatsApp number (International format without '+' for wa.me API)
// Format: 92 followed by 10 digits e.g. 923155074225
const WHATSAPP_NUMBER = "923155074225";

const CONFIG = {
  brandName: "Humi’s Home Kitchen",
  tagline: "Homemade Taste, Made with Love.",
  whatsappNumber: WHATSAPP_NUMBER,
  displayPhone: "+92 315 5074225",
  email: "orders@humiskitchen.com",
  city: "Islamabad / Rawalpindi",
  address: "Sector F-7 / Bahria Town, Islamabad",
  currency: "Rs.",
  deliveryFee: 150, // Standard delivery fee in Rs.
  freeDeliveryThreshold: 2500, // Free delivery for orders >= Rs. 2500
  timings: "11:00 AM – 10:30 PM (Daily)",
  prepNotice: "Orders prepared fresh. Please allow 30-45 minutes.",
  storageKeys: {
    cart: "humis_kitchen_cart_v1",
    customer: "humis_kitchen_customer_v1"
  }
};

// Make available globally
if (typeof window !== "undefined") {
  window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
  window.CONFIG = CONFIG;
}
