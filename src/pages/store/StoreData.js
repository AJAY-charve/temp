// ============ STORE DATA & HELPERS ============

import placeholderImg from "../../assets/cards/bmi.jpeg";
import supplementsImg from "../../assets/cards/supplements.png";
import devicesImg from "../../assets/cards/devices.png";

const HISTORY_KEY = "diabmeta_bookings";
const CART_KEY = "diabmeta_cart";

// --- BOOKING HELPERS ---
export const saveBooking = (booking) => {
    try {
        const prev = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
        localStorage.setItem(HISTORY_KEY, JSON.stringify([booking, ...prev]));
    } catch (e) {
        console.warn("Booking save failed", e);
    }
};

export const getBookings = () => {
    try {
        return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
        return [];
    }
};

// --- CART HELPERS ---
export const getCart = () => {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    } catch {
        return {};
    }
};

export const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
        console.warn("Cart save failed", e);
    }
};

export const getCartItems = () => {
    const cart = getCart();
    return Object.entries(cart)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id), qty }))
        .filter((p) => p.id);
};

export const getCartTotal = () => {
    const items = getCartItems();
    return items.reduce((t, p) => t + p.price * p.qty, 0);
};

export const getCartCount = () => {
    const cart = getCart();
    return Object.values(cart).reduce((a, b) => a + b, 0);
};


// --- CATEGORIES & PRODUCTS ---
export const STORE_CATEGORIES = [
    { key: "all", label: "All", image: placeholderImg },
    { key: "supplements", label: "Supplements", image: supplementsImg },
    { key: "devices", label: "Devices", image: devicesImg },
    { key: "pills", label: "Pills", image: placeholderImg },
    { key: "first-aid", label: "First Aid", image: placeholderImg },
    { key: "fitness", label: "Fitness", image: placeholderImg },
    { key: "personal-care", label: "Care", image: placeholderImg },
];

export const PRODUCTS = [
    {
        id: "s1", name: "Vitamin D3 60K", category: "supplements", brand: "HealthVita",
        price: 320, mrp: 450, unit: "4 Capsules", image: placeholderImg, color: "#e4f4e8",
        description: "High-potency Vitamin D3 supplement to support bone health, immunity and muscle function.",
        specs: [{ label: "Form", value: "Capsule" }, { label: "Strength", value: "60,000 IU" }],
    },
    {
        id: "s2", name: "Omega-3 Fish Oil", category: "supplements", brand: "NutriLife",
        price: 540, mrp: 720, unit: "60 Softgels", image: placeholderImg, color: "#e0eefc",
        description: "Molecularly distilled Omega-3 with EPA & DHA to support heart health.",
        specs: [{ label: "Form", value: "Softgel" }, { label: "EPA", value: "180 mg" }],
    },
    {
        id: "s3", name: "Multivitamin Daily", category: "supplements", brand: "HealthVita",
        price: 410, mrp: 550, unit: "30 Tablets", image: placeholderImg, color: "#fdf1d3",
        description: "Complete daily multivitamin with 23 essential vitamins and minerals.",
        specs: [{ label: "Form", value: "Tablet" }],
    },
    {
        id: "d1", name: "Glucometer Kit", category: "devices", brand: "AccuCheck",
        price: 899, mrp: 1299, unit: "1 Kit + 25 Strips", image: placeholderImg, color: "#e0eefc",
        description: "Accurate blood glucose monitoring kit with 25 test strips.",
        specs: [{ label: "Type", value: "Blood Glucose Meter" }],
    },
    {
        id: "d2", name: "CGM Sensor (14 days)", category: "devices", brand: "LibrePro",
        price: 3499, mrp: 4200, unit: "1 Sensor", image: placeholderImg, color: "#e4f4e8",
        description: "Continuous Glucose Monitoring sensor that tracks sugar levels 24x7.",
        specs: [{ label: "Duration", value: "14 days" }],
    },
    {
        id: "p1", name: "Metformin 500mg", category: "pills", brand: "Glucophage",
        price: 120, mrp: 150, unit: "15 Tablets", image: placeholderImg, color: "#fde3e3",
        description: "First-line medication for the treatment of type 2 diabetes.",
        specs: [{ label: "Strength", value: "500 mg" }],
    },
    {
        id: "f1", name: "Antiseptic Liquid", category: "first-aid", brand: "Dettol",
        price: 180, mrp: 220, unit: "250 ml", image: placeholderImg, color: "#e4f4e8",
        description: "Trusted antiseptic liquid for first aid and personal hygiene.",
        specs: [{ label: "Volume", value: "250 ml" }],
    },
    {
        id: "fi1", name: "Yoga Mat", category: "fitness", brand: "FitPro",
        price: 499, mrp: 899, unit: "1 Unit", image: placeholderImg, color: "#EDE7F6",
        description: "Anti-slip yoga mat for comfortable workouts.",
        specs: [{ label: "Thickness", value: "6 mm" }],
    },
    {
        id: "pc1", name: "Moisturizing Lotion", category: "personal-care", brand: "Cetaphil",
        price: 350, mrp: 450, unit: "200 ml", image: placeholderImg, color: "#fde3e3",
        description: "Hydrating lotion for dry and sensitive skin.",
        specs: [{ label: "Skin Type", value: "Sensitive" }],
    },
];