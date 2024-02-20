document.addEventListener('DOMContentLoaded', function () {
  loadCategories();
});

function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'tasos' && password === '12345') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadCategories();
    loadCategoriesToDelete();
    loadCategoriesForProductToDelete();
  } else {
    alert('Invalid username or password');
  }
}

function addCategory() {
  var categoryName = document.getElementById('categoryName').value;
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  var newCategory = { name: categoryName, products: [] };
  categoriesAndProducts.push(newCategory);
  localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
  loadCategories();
  loadCategoriesToDelete();
  loadCategoriesForProductToDelete();
}

function addProduct() {
  var categorySelector = document.getElementById('categorySelector');
  var selectedCategoryIndex = categorySelector.selectedIndex;
  var productName = document.getElementById('productName').value;
  var productPrice = document.getElementById('productPrice').value;

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts[selectedCategoryIndex].products.push({ name: productName, price: productPrice });
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
  } else {
    alert('Please select a category.');
  }
}

function loadCategories() {
  var categorySelector = document.getElementById('categorySelector');
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  categorySelector.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var option = document.createElement('option');
    option.text = category.name;
    categorySelector.add(option);
  });
}

function loadCategoriesToDelete() {
  var categoryToDeleteSelector = document.getElementById('categoryToDelete');
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  categoryToDeleteSelector.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var option = document.createElement('option');
    option.text = category.name;
    categoryToDeleteSelector.add(option);
  });
}

function loadCategoriesForProductToDelete() {
  var categoryForProductToDeleteSelector = document.getElementById('categoryForProductToDelete');
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  categoryForProductToDeleteSelector.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var option = document.createElement('option');
    option.text = category.name;
    categoryForProductToDeleteSelector.add(option);
  });

  loadProductsToDelete(); // Load products for the initial category
}

function loadProductsToDelete() {
  var categoryForProductToDeleteSelector = document.getElementById('categoryForProductToDelete');
  var selectedCategoryIndex = categoryForProductToDeleteSelector.selectedIndex;
  var productToDeleteSelector = document.getElementById('productToDelete');
  productToDeleteSelector.innerHTML = '';

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    var selectedCategory = categoriesAndProducts[selectedCategoryIndex];

    selectedCategory.products.forEach(function (product, index) {
      var option = document.createElement('option');
      option.text = product.name;
      productToDeleteSelector.add(option);
    });
  }
}

function deleteCategory() {
  var categoryToDeleteSelector = document.getElementById('categoryToDelete');
  var selectedCategoryIndex = categoryToDeleteSelector.selectedIndex;

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts.splice(selectedCategoryIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
    loadCategoriesToDelete();
    loadCategoriesForProductToDelete();
  } else {
    alert('Please select a category to delete.');
  }
}

function deleteProduct() {
  var categoryForProductToDeleteSelector = document.getElementById('categoryForProductToDelete');
  var selectedCategoryIndex = categoryForProductToDeleteSelector.selectedIndex;
  var productToDeleteSelector = document.getElementById('productToDelete');
  var selectedProductIndex = productToDeleteSelector.selectedIndex;

  if (selectedCategoryIndex !== -1 && selectedProductIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts[selectedCategoryIndex].products.splice(selectedProductIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
    loadProductsToDelete();
  } else {
    alert('Please select a category and a product to delete.');
  }
}
