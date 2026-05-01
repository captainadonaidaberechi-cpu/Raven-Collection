// script.js - Complete Wig Store with Vision, Mission, Directors & Payment

// PRODUCT DATA - 8 premium wigs
const products = [
  { id: 1, name: "Aria Silk Straight", desc: "22” natural sheen, lace frontal, pre-plucked", price: 289, oldPrice: 420, image: "https://m.media-amazon.com/images/I/71MNQ2C+kBL._AC_SL1000_.jpg" },
  { id: 2, name: "Bianca Body Wave", desc: "24” bouncy waves, HD lace, bleached knots", price: 329, oldPrice: 480, image: "https://www.cliphair.co.uk/cdn/shop/articles/kyaheljadi_1_7f1cde9d-cec5-467d-bbd5-5c1fe1b275e8.jpg?v=1757320554" },
  { id: 3, name: "Caprice Curly Coil", desc: "20” defined curls, volume & lightweight", price: 359, oldPrice: 499, image: "https://cdn2.stylecraze.com/wp-content/uploads/2021/12/How-To-Create-Big-Voluminous-Curls-Using-A-Blowdryer-1.jpg.avif" },
  { id: 4, name: "Soleil Glueless", desc: "13x6 transparent lace, ready to wear", price: 399, oldPrice: 570, image: "https://m.media-amazon.com/images/I/71j4Ay47GiL._SL1500_.jpg" },
  { id: 5, name: "Mirage Ombré", desc: "Honey blonde balayage, 26” length", price: 449, oldPrice: 629, image: "https://scontent.flos5-1.fna.fbcdn.net/v/t39.30808-6/547516308_1512427619817513_5593445813955429550_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_ohc=VFIL1eDjxNQQ7kNvwEAGvMl&_nc_oc=AdpVeu_YwcQFX8IwtH9lCtzkMa8zTiRUN4duMerLwA-nNPTSh2OAC8pPuKCc4MRH7ME&_nc_zt=23&_nc_ht=scontent.flos5-1.fna&_nc_gid=OWzmIFWx1divbKVBxPuHFQ&_nc_ss=7b289&oh=00_Af0lTOWVOKEqsdjVRVMz-36-OgoLf1JtLK6_-YLKbCZO6Q&oe=69F6C197" },
  { id: 6, name: "Noelle Short Bob", desc: "Chic layered bob, easy daily style", price: 219, oldPrice: 310, image: "https://hips.hearstapps.com/hmg-prod/images/bob-haircuts-for-womenat0-75x-688a90ab37fc2.png?crop=0.423xw:0.846xh;0.0481xw,0.0769xh&resize=640:*" },
  { id: 7, name: "Luxury Kinky Curly", desc: "18” voluminous kinky curls, natural black", price: 379, oldPrice: 520, image: "https://cdn.asteriahair.com/media/catalog/product/a/f/afro_wig.jpg" },
  { id: 8, name: "Honey Blonde Lace", desc: "20” honey blonde, pre-bleached knots", price: 459, oldPrice: 640, image: "https://www.arabellahair.com/cdn/shop/files/Limited_Design_Ash_Honey_Blonde_Colored_Easy-Wear_Glueless_6x5_Pre-Cut_Lace_Straight_Bob_Wig_With_Bleached_Knots_Human_Hair_Wigs-2.jpg?v=1739583252&width=750" },
  { id: 9, name: "Platinum Silk Top", desc: "22” icy platinum, 13x6 HD lace", price: 499, oldPrice: 690, image: "https://m.media-amazon.com/images/I/71bAJjIOWlL._SX679_.jpg" },
  { id: 10, name: "Deep Wave Master", desc: "24” deep wave, extra volume, silk base", price: 389, oldPrice: 540, image: "https://oqhair.com/cdn/shop/files/277_1800x1800.jpg?v=1758855464" },
  { id: 11, name: "Natural Black Straight", desc: "26” silky straight, invisible lace", price: 319, oldPrice: 450, image: "https://m.media-amazon.com/images/I/71nfb4cAQFL._SY879_.jpg" },
  { id: 12, name: "Auburn Curl Queen", desc: "20” auburn curls, heat-friendly fiber", price: 349, oldPrice: 490, image: "https://m.media-amazon.com/images/I/51mczUPCX0L._SY300_SX300_QL70_FMwebp_.jpg" },
];

let cart = [];
let currentTotal = 0;

// DOM Elements
const preloader = document.getElementById('preloader');
const productGrid = document.getElementById('productGrid');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPriceSpan = document.getElementById('cartTotalPrice');
const cartCountSpan = document.getElementById('cartCount');
const toastMsg = document.getElementById('toastMsg');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const paymentModal = document.getElementById('paymentModal');
const paymentAmountSpan = document.getElementById('paymentAmount');
const payNowBtn = document.getElementById('payNowBtn');
const termsCheckbox = document.getElementById('termsCheckbox');

// Hide preloader after entrance animation
window.addEventListener('load', () => {
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hide');
      setTimeout(() => { if (preloader) preloader.style.display = 'none'; }, 800);
    }
  }, 1500);
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light';
  } else {
    document.body.classList.remove('dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark';
  }
}

function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark';
  } else {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light';
  }
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
initTheme();

// Toast Notification
function showToast(msg) {
  if (toastMsg) {
    toastMsg.textContent = msg;
    toastMsg.style.opacity = '1';
    setTimeout(() => { toastMsg.style.opacity = '0'; }, 2500);
  }
}

// Cart Functions
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountSpan) cartCountSpan.innerText = totalItems;
  currentTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (cartTotalPriceSpan) cartTotalPriceSpan.innerText = `$${currentTotal}`;

  if (!cartItemsList) return;
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<div class="empty-cart-msg">Your crown awaits — add a wig ✨</div>';
    return;
  }
  cartItemsList.innerHTML = '';
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.name}">
      <div style="flex:1">
        <div><strong>${item.name}</strong></div>
        <div>$${item.price}</div>
        <div style="display:flex; gap:10px; margin-top:8px;">
          <button class="qty-btn" data-idx="${idx}" data-delta="-1">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-idx="${idx}" data-delta="1">+</button>
          <button class="remove-btn" data-idx="${idx}" style="background:none; border:none; cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    cartItemsList.appendChild(div);
  });
  
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const delta = parseInt(btn.dataset.delta);
      const newQty = cart[idx].quantity + delta;
      if (newQty <= 0) cart.splice(idx, 1);
      else cart[idx].quantity = newQty;
      updateCartUI();
      saveCart();
    });
  });
  
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      cart.splice(idx, 1);
      updateCartUI();
      saveCart();
    });
  });
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  updateCartUI();
  saveCart();
  showToast(`${product.name} added to cart ✨`);
}

function saveCart() { localStorage.setItem('luxoria_cart', JSON.stringify(cart)); }
function loadCart() {
  const saved = localStorage.getItem('luxoria_cart');
  if (saved) { cart = JSON.parse(saved); updateCartUI(); }
}

// Render Products
function renderProducts() {
  if (!productGrid) return;
  productGrid.innerHTML = '';
  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img class="product-img" src="${prod.image}" alt="${prod.name}" loading="lazy">
      <div class="product-info">
        <div class="product-title">${prod.name}</div>
        <div class="product-desc">${prod.desc}</div>
        <div class="price-row">
          <span class="price">$${prod.price}</span>
          <span class="old-price">$${prod.oldPrice}</span>
        </div>
        <button class="add-to-cart" data-id="${prod.id}"><i class="fas fa-shopping-bag"></i> Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });
}

// Format card inputs
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formatted;
  });
}
const cardExpiryInput = document.getElementById('cardExpiry');
if (cardExpiryInput) {
  cardExpiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length >= 2) value = value.slice(0,2) + '/' + value.slice(2,4);
    e.target.value = value.slice(0,5);
  });
}
const cardCvvInput = document.getElementById('cardCvv');
if (cardCvvInput) {
  cardCvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0,4);
  });
}

// Enable/Disable Pay Button based on Terms Checkbox
if (termsCheckbox) {
  termsCheckbox.addEventListener('change', () => {
    if (payNowBtn) payNowBtn.disabled = !termsCheckbox.checked;
  });
}

// Payment Modal Functions
function openPaymentModal() {
  if (cart.length === 0) { 
    showToast('Your cart is empty. Add some beautiful wigs first!'); 
    return; 
  }
  paymentAmountSpan.innerText = `$${currentTotal}`;
  paymentModal.classList.add('active');
  // Reset form
  document.getElementById('fullName').value = '';
  document.getElementById('emailAddress').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phoneNumber').value = '';
  document.getElementById('cardNumber').value = '';
  document.getElementById('cardExpiry').value = '';
  document.getElementById('cardCvv').value = '';
  if (termsCheckbox) termsCheckbox.checked = false;
  if (payNowBtn) payNowBtn.disabled = true;
}

function closePaymentModal() { 
  paymentModal.classList.remove('active'); 
}

// Process Payment with validation
function processPayment() {
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('emailAddress').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phoneNumber').value.trim();
  const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const cardExpiry = document.getElementById('cardExpiry').value;
  const cardCvv = document.getElementById('cardCvv').value;
  
  // Validation
  if (!fullName) { showToast('❌ Please enter your full name'); return; }
  if (!email || !email.includes('@')) { showToast('❌ Please enter a valid email address'); return; }
  if (!address) { showToast('❌ Please enter your shipping address'); return; }
  if (!phone || phone.length < 8) { showToast('❌ Please enter a valid phone number'); return; }
  if (cardNumber.length < 15) { showToast('❌ Please enter a valid card number'); return; }
  if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) { showToast('❌ Please enter valid expiry date (MM/YY)'); return; }
  if (cardCvv.length < 3) { showToast('❌ Please enter valid CVV'); return; }
  if (!termsCheckbox.checked) { showToast('❌ Please agree to the Terms & Conditions'); return; }
  
  // Disable button and show processing
  const payBtn = document.getElementById('payNowBtn');
  const originalText = payBtn.innerHTML;
  payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  payBtn.disabled = true;
  
  // Simulate payment processing
  setTimeout(() => {
    // Payment successful - clear cart
    cart = [];
    updateCartUI();
    saveCart();
    closePaymentModal();
    showToast(`✅ Payment Successful! Thank you ${fullName}. Your order confirmation has been sent to ${email}.`);
    
    // Reset button
    payBtn.innerHTML = originalText;
    payBtn.disabled = true;
    if (termsCheckbox) termsCheckbox.checked = false;
  }, 2000);
}

// Attach event listener to the Confirm & Pay button
if (payNowBtn) {
  payNowBtn.addEventListener('click', processPayment);
}

// Navigation Event Listeners
document.getElementById('cartIconBtn')?.addEventListener('click', () => cartOverlay?.classList.add('open'));
document.getElementById('closeCartBtn')?.addEventListener('click', () => cartOverlay?.classList.remove('open'));
cartOverlay?.addEventListener('click', (e) => { if (e.target === cartOverlay) cartOverlay.classList.remove('open'); });
document.getElementById('checkoutBtn')?.addEventListener('click', openPaymentModal);
document.getElementById('closePaymentBtn')?.addEventListener('click', closePaymentModal);
paymentModal?.addEventListener('click', (e) => { if (e.target === paymentModal) closePaymentModal(); });

// Smooth Scroll Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const section = link.dataset.section;
    const element = document.getElementById(section);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.getElementById('logo')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('shopNowBtn')?.addEventListener('click', () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }));

// Back to Top
window.addEventListener('scroll', () => {
  if (backToTop) {
    if (window.scrollY > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }
});
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Newsletter
document.getElementById('subscribeBtn')?.addEventListener('click', () => {
  const email = document.getElementById('newsletterEmail')?.value;
  if (email && email.includes('@')) {
    showToast('🎉 Subscribed! Check your inbox for 15% off.');
    document.getElementById('newsletterEmail').value = '';
  } else showToast('Please enter a valid email address');
});

// Social Icons
document.querySelectorAll('.social-icons i').forEach(icon => {
  icon.addEventListener('click', () => showToast('Follow us for exclusive updates!'));
});

// Initialize
renderProducts();
loadCart();