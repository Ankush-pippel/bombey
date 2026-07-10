let currentDish = null;

// Page load hone par saari details render karna
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('dish');
    
    currentDish = BOMBAY_CHAUPATI_MENU.find(i => i.id === dishId);
    if (!currentDish) return;

    // Dish dynamic layout rendering
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

    // Dynamic Card Pop-up Box HTML automatically inject karna taaki id missing ka koi jhanjhat hi na rahe
    injectCustomModalHTML();

    // Button Listener Bind Setup
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCartAction);
    }
});

function updatePrice(value) {
    document.getElementById('live-price').textContent = `₹${value}`;
}

// Automatic Modal Injector Engine
function injectCustomModalHTML() {
    if (document.getElementById('custom-confirm-modal')) return; // Agar pehle se hai toh dobara na bane

    const modalWrapper = document.createElement('div');
    modalWrapper.id = 'custom-confirm-modal';
    modalWrapper.className = 'modal-overlay';
    modalWrapper.style.display = 'none'; // Shuruat mein hidden rahega
    
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

// Main Add to Cart Logic Function Execution
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

    // Dynamic setups data integration
    modalImg.src = currentDish.image;
    modalMessage.innerHTML = `Add <b>${currentDish.name} (${variantName})</b> to your cart?`;
    actionsBox.style.display = "flex"; 
    
    // Smooth flex popup pop
    modal.style.display = "flex";

    // Dynamic Event handling configuration clones
    const newOkBtn = okBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    // 👍 JAB USER "OK" PAR CLICK KARE
    newOkBtn.addEventListener('click', () => {
        SharedCart.add({
            id: currentDish.id,
            name: currentDish.name,
            variant: variantName,
            price: parseInt(price),
            qty: 1
        });
        
        modalMessage.innerHTML = `<span style="color: #2e7d32; font-size: 18px; font-weight: bold;"><i class="fas fa-check-circle"></i> Added to cart successfully!</span>`;        actionsBox.style.display = "none";
        setTimeout(() => {
            modal.style.display = "none";
        }, 2000);
    });

    // 👎 JAB USER "CANCEL" PAR CLICK KARE
    newCancelBtn.addEventListener('click', () => {
       modalMessage.innerHTML = `<span style="color: #c0392b; font-size: 18px; font-weight: bold;"><i class="fas fa-times-circle"></i> Item not added</span>`;
        actionsBox.style.display = "none";

        setTimeout(() => {
            modal.style.display = "none";
        }, 2000);
    });
}