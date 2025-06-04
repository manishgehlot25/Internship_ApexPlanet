// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// On Load
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

// Add to Cart
function addToCart(name, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cart.findIndex(item => item.name === name);

  if (existingItemIndex > -1) {
    // If item exists, increase quantity
    cart[existingItemIndex].qty = (cart[existingItemIndex].qty || 1) + 1;
  } else {
    // Add new item
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}


const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-filter");
const cards = document.querySelectorAll(".product-grid .card");

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const parentSection = card.closest("section, div");
    const sectionId = parentSection?.previousElementSibling?.id || '';

    const matchSearch = title.includes(searchTerm);
    const matchCategory = category === "all" || sectionId === category;

    if (matchSearch && matchCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
