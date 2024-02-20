// dashboard.js

// Define an empty array to store categories and products
let categoriesAndProducts = [];

function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'tasos' && password === '12345') {
    // If login is successful, display the dashboard
    document.getElementById('dashboard').style.display = 'block';

    // Load existing data from localStorage
    loadCategoriesAndProducts();
  } else {
    alert('Invalid username or password');
  }
}

function loadCategoriesAndProducts() {
  // Load data from localStorage
  const storedData = localStorage.getItem('categoriesAndProducts');

  // Parse the stored data or use an empty array if it doesn't exist
  categoriesAndProducts = storedData ? JSON.parse(storedData) : [];

  // Display categories and products
  displayCategoriesAndProducts();
}

function addCategory() {
  var categoryName = document.getElementById('categoryName').value;

  // Check if the category already exists
  if (!categoriesAndProducts.find(category => category.name === categoryName)) {
    // Add the new category
    categoriesAndProducts.push({ name: categoryName, products: [] });

    // Save the updated data to localStorage
    saveCategoriesAndProducts();
  } else {
    alert('Category already exists!');
  }
}

function deleteCategory(categoryName) {
  // Find the index of the category in the array
  const index = categoriesAndProducts.findIndex(category => category.name === categoryName);

  // Check if the category was found
  if (index !== -1) {
    // Remove the category from the array
    categoriesAndProducts.splice(index, 1);

    // Save the updated data to localStorage
    saveCategoriesAndProducts();
  }
}

function addProduct() {
  var categoryName = document.getElementById('categorySelector').value;
  var productName = document.getElementById('productName').value;
  var productPrice = document.getElementById('productPrice').value;

  // Find the category in the array
  const category = categoriesAndProducts.find(category => category.name === categoryName);

  // Check if the product already exists in the category
  if (category && !category.products.find(product => product.name === productName)) {
    // Add the new product to the category
    category.products.push({ name: productName, price: parseFloat(productPrice) });

    // Save the updated data to localStorage
    saveCategoriesAndProducts();
  } else {
    alert('Product already exists in the category!');
  }
}

function deleteProduct(categoryName, productName) {
  // Find the category in the array
  const category = categoriesAndProducts.find(category => category.name === categoryName);

  // Check if the category and product exist
  if (category) {
    // Find the index of the product in the category
    const index = category.products.findIndex(product => product.name === productName);

    // Check if the product was found
    if (index !== -1) {
      // Remove the product from the category
      category.products.splice(index, 1);

      // Save the updated data to localStorage
      saveCategoriesAndProducts();
    }
  }
}

function saveCategoriesAndProducts() {
  // Save data to localStorage
  localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));

  // Display categories and products
  displayCategoriesAndProducts();
}

function displayCategoriesAndProducts() {
  // Your code to display categories and products
  console.log(categoriesAndProducts);
}

// Call loadCategoriesAndProducts() when the page loads
loadCategoriesAndProducts();
