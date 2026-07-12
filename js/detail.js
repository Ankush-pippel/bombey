let currentDish = null;
let currentQty = 1; // 👈 Naya quantity tracker

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('dish');
    
    currentDish = BOMBAY_CHAUPATI_MENU.find(i => i.id === dishId);
    if (!currentDish) return;

    document.getElementById('dish-name').textContent = currentDish.name;
    document.getElementById('dish-desc').textContent = currentDish.description;
    document.getElementById('dish-img').src = currentDish.image;

    const form = document.getElementById('variety-form');
    currentDish.variants.forEach((v, index) => {
        form.innerHTML += `
            <label class="variant-row">
                <span>
                    <input type="radio" name="variant" value="${v.price}" data-name="${v.name}" ${index === 0 ? 'checked' : ''} onchange="updatePrice(this.value)">
                    ${v.name}
                </span>
                <span>₹${v.price}</span>
            </label>
        `;
    });

    updatePrice(currentDish.variants[0].price);
    injectCustomModalHTML();

    // 👇 Quantity Plus/Minus Button Listeners
    document.getElementById('qty-plus').addEventListener('click', () => {
        currentQty++;
        document.getElementById('qty-value').textContent = currentQty;
    });

    document.getElementById('qty-minus').addEventListener('click', () => {
        if (currentQty > 1) {
            currentQty--;
            document.getElementById('qty-value').textContent = currentQty;
        }
    });

    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCartAction);
    }
});

function updatePrice(value) {
    document.getElementById('live-price').textContent = `₹${value}`;
}

function injectCustomModalHTML() {
    if (document.getElementById('custom-confirm-modal')) return;

    const modalWrapper = document.createElement('div');
    modalWrapper.id = 'custom-confirm-modal';
    modalWrapper.className = 'modal-overlay';
    modalWrapper.style.display = 'none';
    
    modalWrapper.innerHTML = `
        <div class="modal-card">
            <div class="modal-img-container">
                <img id="modal-dish-img" src="" alt="Snapshot" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin-bottom: 15px; border: 2px solid #e74c3c;">
            </div>
            <h3 id="modal-message"></h3>
            <div class="modal-actions" id="modal-actions-box" style="display: flex; gap: 15px; justify-content: center; margin-top: 20px;">
                <button id="modal-cancel-btn" class="btn-modal-cancel">Cancel</button>
                <button id="modal-ok-btn" class="btn-modal-ok">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalWrapper);
}

function addToCartAction() {
    const selected = document.querySelector('input[name="variant"]:checked');
    if (!selected) return;

    const price = selected.value;
    const variantName = selected.getAttribute('data-name');

    const modal = document.getElementById('custom-confirm-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalImg = document.getElementById('modal-dish-img');
    const actionsBox = document.getElementById('modal-actions-box');
    const okBtn = document.getElementById('modal-ok-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');

    modalImg.src = currentDish.image;
    modalMessage.innerHTML = `Add <b>${currentQty} x ${currentDish.name} (${variantName})</b> to your cart?`;
    actionsBox.style.display = "flex"; 
    modal.style.display = "flex";

    const newOkBtn = okBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    newOkBtn.addEventListener('click', () => {
        SharedCart.add({
            id: currentDish.id,
            name: currentDish.name,
            variant: variantName,
            price: parseInt(price),
            qty: currentQty   // 👈 Ab fixed 1 nahi, selected quantity jayegi
        });

        modalMessage.innerHTML = `<span style="color: #2e7d32; font-size: 18px; font-weight: bold;"><i class="fas fa-check-circle"></i> Added to cart successfully!</span>`;
        actionsBox.style.display = "none";

        // Reset quantity back to 1 for next selection
        currentQty = 1;
        document.getElementById('qty-value').textContent = 1;

        setTimeout(() => {
            modal.style.display = "none";
        }, 2000);
    });

    newCancelBtn.addEventListener('click', () => {
        modalMessage.innerHTML = `<span style="color: #c0392b; font-size: 18px; font-weight: bold;"><i class="fas fa-times-circle"></i> Item not added</span>`;
        actionsBox.style.display = "none";

        setTimeout(() => {
            modal.style.display = "none";
        }, 2000);
    });
}
