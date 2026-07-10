// js/database.js

const BOMBAY_CHAUPATI_MENU = [
    {
        id: "tandoori-momos",
        name: "Tandoori Momos",
        image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=500&q=80",
        description: "Choose your Tandoori Flavor: Tagda Toofani, Classic Peri Peri, Afghani Malai, etc.",
        variants: [
            { name: "Veg - Half (4 Pcs)", price: 80 },
            { name: "Veg - Full (8 Pcs)", price: 150 },
            { name: "Paneer - Half (4 Pcs)", price: 100 },
            { name: "Paneer - Full (8 Pcs)", price: 180 }
        ]
    },
    {
        id: "gravy-momos",
        name: "Gravy Momos",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80",
        description: "Choose your Gravy: Kashmiri Rogan Josh, Butter Masala, Dhaba Tawa, Italian Cheese.",
        variants: [
            { name: "Veg - 4 Pcs", price: 100 },
            { name: "Veg - 8 Pcs", price: 180 },
            { name: "Paneer - 4 Pcs", price: 120 },
            { name: "Paneer - 8 Pcs", price: 200 }
        ]
    },
    {
        id: "pizza",
        name: "Special Cheese Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
        description: "Options: Margherita, Double Cheese, Farm House, Deluxe Veggie, Achari DoPyaza.",
        variants: [
            { name: "Margherita - Small", price: 70 },
            { name: "Margherita - Medium", price: 150 },
            { name: "Farm House - Small", price: 150 },
            { name: "Farm House - Medium", price: 200 },
            { name: "Deluxe Veggie - Large", price: 220 }
        ]
    },
    {
        id: "tandoori-chaap",
        name: "Tandoori Chaap",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
        description: "Afghani Malai Chaap, Tagda Toofani, Classic Peri-Peri, Achari Ghost.",
        variants: [
            { name: "Half Plate", price: 100 },
            { name: "Full Plate", price: 180 }
        ]
    },
    {
        id: "noodles",
        name: "Chowmein & Noodles",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
        description: "Hakka Noodles, Schezwan Noodles, Chilli Garlic, Singapore Noodles.",
        variants: [
            { name: "Veg Noodle - Half", price: 50 },
            { name: "Veg Noodle - Full", price: 90 },
            { name: "Paneer Noodle - Half", price: 70 },
            { name: "Paneer Noodle - Full", price: 120 }
        ]
    },
    {
        id: "burger",
        name: "Crispy Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        description: "Aloo Tikki Burger, Veg Burger, Cheese Burger.",
        variants: [
            { name: "Aloo Tikki Burger", price: 40 },
            { name: "Veg Burger", price: 50 },
            { name: "Cheese Burger", price: 60 }
        ]
    }
];

// Shared Cart Helper System
const SharedCart = {
    get() { return JSON.parse(localStorage.getItem('demo_cart')) || []; },
    save(cart) { localStorage.setItem('demo_cart', JSON.stringify(cart)); this.updateBadge(); },
    add(item) {
        let cart = this.get();
        let exist = cart.findIndex(i => i.id === item.id && i.variant === item.variant);
        if (exist > -1) { cart[exist].qty += 1; } else { cart.push(item); }
        this.save(cart);
    },
    updateBadge() {
        const badge = document.getElementById('nav-cart-count');
        if (badge) { badge.textContent = this.get().reduce((s, i) => s + i.qty, 0); }
    }
};
document.addEventListener('DOMContentLoaded', () => SharedCart.updateBadge());


// Hamburger Menu Toggle Function for Mobile Screens
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const toggleIcon = document.querySelector('#menu-toggle i');
    
    navMenu.classList.toggle('show-menu');
    
    // Icon change karega: Bars (☰) <-> Times (✖)
    if (navMenu.classList.contains('show-menu')) {
        toggleIcon.className = "fas fa-times";
    } else {
        toggleIcon.className = "fas fa-bars";
    }
}