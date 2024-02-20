// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  // Load categories from localStorage
  const storedCategories = localStorage.getItem('categories');
  const categories = storedCategories ? JSON.parse(storedCategories) : [];

  // Display categories in the dropdowns
  displayCategories(categories);
});

function displayCategories(categories) {
  // Populate category dropdowns for add/delete operations
  var addCategoryDropdown = document.getElementById('categorySelector');
  var deleteCategoryDropdown = document.getElementById('categorySelectorDelete');
  var deleteProductCategoryDropdown = document.getElementById('categorySelectorDeleteProduct');

  addCategoryDropdown.innerHTML = '';
  deleteCategoryDropdown.innerHTML = '';
  deleteProductCategoryDropdown.innerHTML = '';

  categories.forEach(function (category) {
    var option = document.createElement('option');
    option.value = category.name;
    option.text = category.name;

    addCategoryDropdown.appendChild(option);
    deleteCategoryDropdown.appendChild(option.cloneNode(true));
    deleteProductCategoryDropdown.appendChild(option.cloneNode(true));
  });
}

// Login function with username and password validation
function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Check if username and password are correct
  if (username === 'tasos' && password === '12345') {
    // Show the dashboard
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  } else {
    alert('Invalid username or password');
  }
}

// Function to add a new category
function addCategory() {
  var categoryName = document.getElementById('categoryName').value;

  // Check if the category already exists
  if (!isCategoryExists(categoryName)) {
    // Add the new category
    var newCategory = { name: categoryName, products: [] };
    categories.push(newCategory);

    // Update the category dropdowns
    displayCategories(categories);

    // Save categories to localStorage
    saveCategoriesToStorage();

    // Clear the input field
    document.getElementById('categoryName').value = '';
  } else {
    alert('Category already exists!');
  }
}

// Function to delete a category
function deleteCategory() {
  var selectedCategory = document.getElementById('categorySelectorDelete').value;

  // Find and remove the category
  categories = categories.filter(function (category) {
    return category.name !== selectedCategory;
  });

  // Update the category dropdowns
  displayCategories(categories);

  // Save categories to localStorage
  saveCategoriesToStorage();
}

// Function to add a new product
function addProduct() {
  var selectedCategory = document.getElementById('categorySelector').value;
  var productName = document.getElementById('productName').value;
  var productPrice = document.getElementById('productPrice').value;

  // Find the selected category
  var category = categories.find(function (category) {
    return category.name === selectedCategory;
  });

  // Check if the product already exists in the category
  if (!isProductExists(category, productName)) {
    // Add the new product to the category
    var newProduct = { name: productName, price: parseFloat(productPrice) };
    category.products.push(newProduct);

    // Save categories to localStorage
    saveCategoriesToStorage();

    // Clear the input fields
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
  } else {
    alert('Product already exists in the category!');
  }
}

// Function to delete a product
function deleteProduct() {
  var selectedCategory = document.getElementById('categorySelectorDeleteProduct').value;
  var selectedProduct = document.getElementById('productSelectorDeleteProduct').value;

  // Find the selected category
  var category = categories.find(function (category) {
    return category.name === selectedCategory;
  });

  // Find and remove the selected product from the category
  category.products = category.products.filter(function (product) {
    return product.name !== selectedProduct;
  });

  // Save categories to localStorage
  saveCategoriesToStorage();
}

// Helper function to check if a category already exists
function isCategoryExists(categoryName) {
  return categories.some(function (category) {
    return category.name.toLowerCase() === categoryName.toLowerCase();
  });
}

// Helper function to check if a product already exists in a category
function isProductExists(category, productName) {
  return category.products.some(function (product) {
    return product.name.toLowerCase() === productName.toLowerCase();
  });
}

// Helper function to save categories to localStorage
function saveCategoriesToStorage() {
  localStorage.setItem('categories', JSON.stringify(categories));
}
