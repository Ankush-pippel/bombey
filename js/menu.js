// js/menu.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('menu-grid');
    
    BOMBAY_CHAUPATI_MENU.forEach(item => {
        grid.innerHTML += `
            <div class="dish-card" onclick="goToDetail('${item.id}')">
                <img src="${item.image}" alt="${item.name}">
                <div class="dish-info">
                    <h2>${item.name}</h2>
                    <span class="btn-view">View Varieties</span>
                </div>
            </div>
        `;
    });
});

function goToDetail(id) {
    window.location.href = `product-detail.html?dish=${id}`;
}
