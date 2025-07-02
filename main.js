let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return await res.json();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function savePurchaseHistory() {
  localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  cartItems.textContent = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const product = allProducts.find(p => p.id === item.id);
    total += product.price * item.qty;
    count += item.qty;

    const template = document.getElementById("cart-item-template");
    const node = template.content.cloneNode(true);

    const cartTitle = node.querySelector(".cart-title");
    cartTitle.textContent = `${product.title} - $${product.price}`;

    const cartQty = node.querySelector(".cart-qty");
    cartQty.textContent = item.qty;

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
  const totalHeading = document.createElement("h3");
  totalHeading.textContent = `Total: $${total.toFixed(2)}`;
  cartTotal.textContent = "";
  cartTotal.appendChild(totalHeading);
}

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

function renderProducts(products) {
  const list = document.getElementById("product-list");
  list.textContent = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.title;
    card.appendChild(img);

    const title = document.createElement("h3");
    title.textContent = p.title;
    card.appendChild(title);

    const price = document.createElement("p");
    price.textContent = `$${p.price}`;
    card.appendChild(price);

    const category = document.createElement("p");
    const em = document.createElement("em");
    em.textContent = p.category;
    category.appendChild(em);
    card.appendChild(category);

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = "1";
    qtyInput.className = "qty-input";
    qtyInput.id = `qty-${p.id}`;
    card.appendChild(qtyInput);

    const addButton = document.createElement("button");
    addButton.className = "add-btn";
    addButton.dataset.id = p.id;
    addButton.textContent = "Agregar al carrito";
    card.appendChild(addButton);

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

function setupFilters(products) {
  const search = document.getElementById("search");
  const category = document.getElementById("filter-category");
  const sort = document.getElementById("sort-options");

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "Todas";
  category.appendChild(allOption);

  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    category.appendChild(option);
  });

  search.addEventListener("input", () => filterAndRender(products));
  category.addEventListener("change", () => filterAndRender(products));
  sort.addEventListener("change", () => filterAndRender(products));
}

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

function renderPurchaseHistory() {
  const historyItems = document.getElementById("history-items");
  historyItems.textContent = "";

  if (purchaseHistory.length === 0) {
    const noHistory = document.createElement("p");
    noHistory.textContent = "No hay compras anteriores.";
    historyItems.appendChild(noHistory);
    return;
  }

  purchaseHistory.forEach((purchase, index) => {
    const purchaseDiv = document.createElement("div");
    purchaseDiv.className = "purchase-record";

    const purchaseTitle = document.createElement("h3");
    purchaseTitle.textContent = `Compra #${index + 1} - ${purchase.date}`;
    purchaseDiv.appendChild(purchaseTitle);

    purchase.products.forEach(item => {
      const itemP = document.createElement("p");
      itemP.textContent = `${item.title} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}`;
      purchaseDiv.appendChild(itemP);
    });
    historyItems.appendChild(purchaseDiv);
  });
}

document.getElementById("enter-btn").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
});

document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart").classList.add("visible");
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("visible");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const purchase = {
    date: new Date().toLocaleString(),
    products: cart.map(item => {
      const product = allProducts.find(p => p.id === item.id);
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        qty: item.qty
      };
    })
  };

  purchaseHistory.push(purchase);
  savePurchaseHistory();

  alert("¡Gracias por tu compra!");
  cart = [];
  saveCart();
  updateCartDisplay();
  document.getElementById("cart").classList.remove("visible");
});

document.getElementById("view-history-btn").addEventListener("click", () => {
  renderPurchaseHistory();
  document.getElementById("purchase-history").classList.add("visible");
});

document.getElementById("close-history").addEventListener("click", () => {
  document.getElementById("purchase-history").classList.remove("visible");
});

(async function init() {
  allProducts = await fetchProducts();
  renderProducts(allProducts);
  setupFilters(allProducts);
  updateCartDisplay();
})();