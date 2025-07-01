let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🛒 Obtener productos desde la API
async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}

// 💾 Guardar el carrito en localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🔄 Mostrar productos en el carrito
function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const product = allProducts.find(p => p.id === item.id);
    total += product.price * item.qty;
    count += item.qty;

    const template = document.getElementById("cart-item-template");
    const node = template.content.cloneNode(true);

    node.querySelector(".cart-title").textContent = `${product.title} - $${product.price}`;
    node.querySelector(".cart-qty").textContent = item.qty;

    node.querySelector(".increment").addEventListener("click", () => {
      item.qty++;
      saveCart();
      updateCartDisplay();
    });

    node.querySelector(".decrement").addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(i => i.id !== item.id);
      }
      saveCart();
      updateCartDisplay();
    });

    node.querySelector(".remove-btn").addEventListener("click", () => {
      cart = cart.filter(i => i.id !== item.id);
      saveCart();
      updateCartDisplay();
    });

    cartItems.appendChild(node);
  });

  cartCount.textContent = count;
  cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// ➕ Agregar al carrito
function addToCart(id, qty) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart();
  updateCartDisplay();
}

// 🧱 Renderizar productos en el DOM
function renderProducts(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <p><em>${p.category}</em></p>
      <input type="number" min="1" value="1" class="qty-input" id="qty-${p.id}">
      <button class="add-btn" data-id="${p.id}">Agregar al carrito</button>
    `;

    list.appendChild(card);
  });

  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const input = document.getElementById(`qty-${id}`);
      const qty = parseInt(input.value);
      if (qty > 0) {
        addToCart(id, qty);
        input.value = 1;
      }
    });
  });
}

// 🎯 Configurar filtros y ordenamiento
function setupFilters(products) {
  const search = document.getElementById("search");
  const category = document.getElementById("filter-category");
  const sort = document.getElementById("sort-options");

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  category.innerHTML = `<option value="">Todas</option>` +
    uniqueCategories.map(cat => `<option value="${cat}">${cat}</option>`).join("");

  search.addEventListener("input", () => filterAndRender(products));
  category.addEventListener("change", () => filterAndRender(products));
  sort.addEventListener("change", () => filterAndRender(products));
}

// 🔍 Filtrar productos
function filterAndRender(products) {
  const searchText = document.getElementById("search").value.toLowerCase();
  const selectedCategory = document.getElementById("filter-category").value;
  const sortValue = document.getElementById("sort-options").value;

  let filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchText) &&
    (selectedCategory === "" || p.category === selectedCategory)
  );

  if (sortValue === "asc") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "desc") filtered.sort((a, b) => b.price - a.price);

  renderProducts(filtered);
}

// 👋 Pantalla de bienvenida
document.getElementById("enter-btn").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
});

// 🛒 Abrir carrito
document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart").classList.add("visible");
});

// ❌ Cerrar carrito
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("visible");
});

// ✅ Finalizar compra
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra!");
  cart = [];
  saveCart();
  updateCartDisplay();
  document.getElementById("cart").classList.remove("visible");
});

// 🚀 Inicializar App
(async function init() {
  allProducts = await fetchProducts();
  renderProducts(allProducts);
  setupFilters(allProducts);
  updateCartDisplay();
})();
