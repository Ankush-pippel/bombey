// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    document.getElementById('checkout-form').addEventListener('submit', handleOrderSubmit);
});

function renderCart() {
    const list = document.getElementById('cart-list');
    const cart = SharedCart.get();
    list.innerHTML = "";
    
    if(cart.length === 0) {
        list.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        list.innerHTML += `
            <div class="cart-row">
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.variant}</small>
                </div>
                <strong>₹${item.price} x ${item.qty}</strong>
            </div>
        `;
    });
    document.getElementById('total-price').textContent = `₹${total}`;
}

function handleOrderSubmit(e) {
    e.preventDefault();
    const cart = SharedCart.get();
    const name = document.getElementById('cust-name').value;
    const address = document.getElementById('cust-address').value;

    let total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    
    let msg = `*🔴 NEW CAFE ORDER (DEMO) 🔴*\n\n*Customer:* ${name}\n*Address:* ${address}\n\n*Items:*\n`;
    cart.forEach(i => {
        const plateLabel = i.qty > 1 ? "Plates" : "Plate";
        msg += `• ${i.name} (${i.variant}) x ${i.qty}\n`; });
    msg += `\n*Total Amount: ₹${total}*`;

    localStorage.removeItem('demo_cart');
    window.open(`https://wa.me/919105974551?text=${encodeURIComponent(msg)}`, '_blank');
}
