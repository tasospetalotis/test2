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

// Other functions for addCategory, deleteCategory, addProduct, deleteProduct

// Add your existing addCategory, deleteCategory, addProduct, and deleteProduct functions here
