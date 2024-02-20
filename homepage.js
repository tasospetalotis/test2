// homepage.js

document.addEventListener("DOMContentLoaded", function () {
  // Load categories and products from localStorage
  const storedData = localStorage.getItem('categoriesAndProducts');
  const categoriesAndProducts = storedData ? JSON.parse(storedData) : [];

  // Display categories and products on the homepage
  displayCategoriesAndProducts(categoriesAndProducts);
});

// Function to display categories and products
// Same as the previous response
