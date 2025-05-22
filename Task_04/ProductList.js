const products = [
    { id: 1, name: "Product A", category: "Electronics", price: 99, rating: 4.5 },
    { id: 2, name: "Product B", category: "Books", price: 20, rating: 4.0 },
    { id: 3, name: "Product C", category: "Clothing", price: 50, rating: 3.5 },
    { id: 4, name: "Product D", category: "Electronics", price: 199, rating: 5.0 },
    { id: 5, name: "Product E", category: "Books", price: 15, rating: 4.2 }
];

const categorySelect = document.getElementById('category');
const priceSelect = document.getElementById('price');
const sortSelect = document.getElementById('sort');
const productContainer = document.getElementById('productContainer');

function renderProducts() {
    const selectedCategory = categorySelect.value;
    const maxPrice = parseFloat(priceSelect.value);
    const sortCriteria = sortSelect.value;

    let filtered = products.filter(p =>
        (selectedCategory === 'All' || p.category === selectedCategory) &&
        p.price <= maxPrice
    );

    filtered.sort((a, b) => b[sortCriteria] - a[sortCriteria]);

    productContainer.innerHTML = filtered.map(product => `
        <div class="card">
          <h3>${product.name}</h3>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Price:</strong> $${product.price}</p>
          <p><strong>Rating:</strong> ${product.rating}</p>
        </div>
      `).join('');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

categorySelect.addEventListener('change', renderProducts);
priceSelect.addEventListener('change', renderProducts);
sortSelect.addEventListener('change', renderProducts);

// Initial render
renderProducts();