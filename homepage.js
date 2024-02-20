// homepage.js

// Define an empty array to store categories and products
let categoriesAndProducts = [];

function loadCategoriesAndProducts() {
  // Load data from localStorage
  const storedData = localStorage.getItem('categoriesAndProducts');

  // Parse the stored data or use an empty array if it doesn't exist
  categoriesAndProducts = storedData ? JSON.parse(storedData) : [];

  // Display categories and products
  displayCategoriesAndProducts();
}

function displayCategoriesAndProducts() {
  // Your code to display categories and products
  console.log(categoriesAndProducts);
}

// Call loadCategoriesAndProducts() when the page loads
loadCategoriesAndProducts();
