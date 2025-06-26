let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}

function addToCart(id, qty) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart();
  updateCartDisplay();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartDisplay();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");
  const productMap = new Map(allProducts.map(p => [String(p.id), p]));
  let totalAmount = 0;
  let totalItems = 0;

  items.innerHTML = "";
  cart.forEach(item => {
    const product = productMap.get(item.id);
    totalAmount += product.price * item.qty;
    totalItems += item.qty;
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${product.title} x${item.qty}</p>
      <p>$${(product.price * item.qty).toFixed(2)}</p>
      <button onclick="removeFromCart('${item.id}')">Eliminar</button>
    `;
    items.appendChild(div);
  });

  count.textContent = totalItems;
  total.innerHTML = `<h3>Total: $${totalAmount.toFixed(2)}</h3>`;
}

function renderProducts(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <p><em>${p.category}</em></p>
      <input type="number" min="1" value="1" class="qty-input" id="qty-${p.id}"/>
      <button data-id="${p.id}">Agregar al carrito</button>
    `;
    list.appendChild(card);
  });

  document.querySelectorAll("button[data-id]").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      const qtyInput = document.getElementById(`qty-${id}`);
      const qty = parseInt(qtyInput.value);
      if (qty > 0) addToCart(id, qty);
    })
  );
}

function setupEventListeners(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const filter = document.getElementById("filter-category");
  filter.innerHTML = `<option value="">Todas</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join("");

  document.getElementById("search").addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
  });

  filter.addEventListener("change", e => {
    const value = e.target.value;
    const filtered = value ? products.filter(p => p.category === value) : products;
    renderProducts(filtered);
  });

  document.getElementById("sort-options").addEventListener("change", e => {
    const value = e.target.value;
    let sorted = [...products];
    if (value === "asc") sorted.sort((a, b) => a.price - b.price);
    else if (value === "desc") sorted.sort((a, b) => b.price - a.price);
    renderProducts(sorted);
  });
}

document.getElementById("cart-icon").addEventListener("click", () => {
  const cart = document.getElementById("cart");
  cart.classList.add("visible");
  cart.classList.add("slide-in");
  setTimeout(() => cart.classList.remove("slide-in"), 400);
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("visible");
});

document.getElementById("enter-btn").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
});

(async function init() {
  allProducts = await fetchProducts();
  renderProducts(allProducts);
  setupEventListeners(allProducts);
  updateCartDisplay();
})();
window.removeFromCart = removeFromCart;
