function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'tasos' && password === '12345') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadCategories();
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

function deleteCategory() {
  var categorySelector = document.getElementById('categorySelector');
  var selectedCategoryIndex = categorySelector.selectedIndex;

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts.splice(selectedCategoryIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
  } else {
    alert('Please select a category to delete.');
  }
}

function deleteProduct() {
  var categorySelector = document.getElementById('categorySelector');
  var selectedCategoryIndex = categorySelector.selectedIndex;
  var productSelector = document.getElementById('productSelector');
  var selectedProductIndex = productSelector.selectedIndex;

  if (selectedCategoryIndex !== -1 && selectedProductIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts[selectedCategoryIndex].products.splice(selectedProductIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
  } else {
    alert('Please select a category and a product to delete.');
  }
}

function loadCategories() {
  var categorySelector = document.getElementById('categorySelector');
  if (categorySelector) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categorySelector.innerHTML = '';

    categoriesAndProducts.forEach(function (category) {
      var option = document.createElement('option');
      option.text = category.name;
      categorySelector.add(option);
    });
  } else {
    console.error("Category selector not found.");
  }
}

function loadProducts() {
  var categorySelector = document.getElementById('categorySelector');
  var selectedCategoryIndex = categorySelector.selectedIndex;
  var productSelector = document.getElementById('productSelector');
  productSelector.innerHTML = '';

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    var selectedCategory = categoriesAndProducts[selectedCategoryIndex];

    selectedCategory.products.forEach(function (product) {
      var option = document.createElement('option');
      option.text = product.name;
      productSelector.add(option);
    });
  }
}
