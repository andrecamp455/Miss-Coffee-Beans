// Global arrays to store product details
const products = [
    { id: 1, name: "SUMATRA DARK ROAST", price: 23.00, quantity: 50 },
    { id: 2, name: "BALI BLUE MOON DARK ROAST", price: 22.00, quantity: 12 },
    { id: 3, name: "BLEND COFFEE MEDIUM ROAST", price: 25.00, quantity: 21 },
    { id: 4, name: "BRULEE COFFEE MEDIUM ROAST", price: 26.00, quantity: 26 },
    { id: 5, name: "COLOMBIA DARK ROAST", price: 20.00, quantity: 19 },
    { id: 6, name: "COLOMBIA MEDIUM ROAST", price: 21.99, quantity: 34 },
    { id: 7, name: "HAZENUT MEDIUM ROAST", price: 20.99, quantity: 29 },
    { id: 8, name: "GROUND COFFEE MEDIUM ROAST", price: 19.99, quantity: 25 },
    { id: 9, name: "FRENCH DARK ROAST", price: 23.99, quantity: 31 },
    { id: 10, name: "HOUSE BLEND LIGHT ROAST", price: 27.99, quantity: 36 }
  ];
  
  // Cart to hold items added
  let cart = [];
  
  // Function to add items to cart
  function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    
    if (product && product.quantity > 0) {
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        cartItem.cartQuantity++;  // If product is already in the cart, increase quantity
      } else {
        cart.push({ ...product, cartQuantity: 1 });
      }
      product.quantity--;
      
      updateCartDetails();
      updateProductQuantityDisplay(productId);
    } else {
      alert('Sorry, this product is out of stock.');
    }
  }
  
  // Function to update cart details
  function updateCartDetails() {
    let totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0);
    let totalCost = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0).toFixed(2);
  
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-cost').textContent = totalCost;
  }
  
  // Function to update the displayed product quantity on the page
  function updateProductQuantityDisplay(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
      document.getElementById(`quantity${productId}`).textContent = product.quantity;
    }
  }
  
  // Function to calculate checkout details
  function calculateCheckout() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    let tax = subtotal * 0.15; // Assuming 15% tax
    let discount = subtotal > 100 ? subtotal * 0.10 : 0; // 10% discount if subtotal is over $100
    let total = subtotal + tax - discount;
  
    return { subtotal, tax, discount, total };
  }
  
  // Function to handle checkout and redirect to Invoice.html
  function checkout() {
    if (cart.length === 0) {
      alert('Your cart is empty. Add some products first.');
      return;
    }
  
    const { subtotal, tax, discount, total } = calculateCheckout();
  
    // Store invoice details in localStorage to pass them to the Invoice.html page
    const invoiceData = {
      cartItems: cart.map(item => ({ name: item.name, price: item.price, cartQuantity: item.cartQuantity })),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2)
    };
  
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  

    window.location.href = 'Invoice.html';
  }
  
  // Event listeners for buttons
  document.getElementById('checkoutBtn').addEventListener('click', checkout);
  document.getElementById('cancelBtn').addEventListener('click', () => {
    cart = [];
    updateCartDetails();
    alert('Your cart has been cleared.');
  });
  document.getElementById('exitBtn').addEventListener('click', () => {
    window.close(); 
  });
  
 
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.getAttribute('data-product').split(' ')[1]);
      addToCart(productId);
    });
  });
  