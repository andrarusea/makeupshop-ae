document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
  
    // Function to fetch products
    function fetchProducts() {
      fetch('http://localhost:8080/products')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(products => {
          // Display products in the UI
          displayProducts(products);
        })
        .catch(error => {
          console.error('Error fetching products:', error.message);
        });
    }
  
    // Function to display products in the UI
    function displayProducts(products) {
      productList.innerHTML = ''; // Clear previous product list
      products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.id}: ${product.name} - $${product.price}`;
        productList.appendChild(li);
      });
    }
  
    // Fetch products when the page loads
    fetchProducts();
  });
  