const products = [
  { id: 1, name: "SUMATRA DARK ROAST", price: 23.00, quantity: 50 },
  { id: 2, name: "BALI BLUE MOON DARK ROAST", price: 22.00, quantity: 12 },
  { id: 3, name: "BLEND COFFEE MEDIUM ROAST", price: 25.00, quantity: 21 },
  { id: 4, name: "BRULEE COFFEE MEDIUM ROAST", price: 26.00, quantity: 26 }
];

let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product || product.quantity === 0) {
    alert("Out of stock");
    return;
  }

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.cartQuantity++;
  } else {
    cart.push({ ...product, cartQuantity: 1 });
  }

  product.quantity--;
  updateUI();
}

function updateUI() {
  let totalItems = 0;
  let totalCost = 0;

  cart.forEach(item => {
    totalItems += item.cartQuantity;
    totalCost += item.cartQuantity * item.price;
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-cost").textContent = totalCost.toFixed(2);

  products.forEach(p => {
    const stockEl = document.querySelector(
      `.product-card[data-id="${p.id}"] .stock`
    );
    if (stockEl) {
      stockEl.textContent = `In Stock: ${p.quantity}`;
    }
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  localStorage.setItem("invoiceData", JSON.stringify(cart));
  window.location.href = "Invoice.html";
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.id));
    });
  });

  document.querySelector(".checkout-btn")
    .addEventListener("click", checkout);

  document.querySelectorAll(".secondary-btn")[0]
    .addEventListener("click", () => {
      cart = [];
      updateUI();
      alert("Cart cleared");
    });

  document.querySelectorAll(".secondary-btn")[1]
    .addEventListener("click", () => {
      window.location.href = "Product_page.html";
    });
});
