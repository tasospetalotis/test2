function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'tasos' && password === '12345') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadCategories();
    loadCategoriesToDelete();
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
  var categorySelectorToDelete = document.getElementById('categorySelectorToDelete');
  var selectedCategoryIndex = categorySelectorToDelete.selectedIndex;

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts.splice(selectedCategoryIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
    loadCategoriesToDelete();
  } else {
    alert('Please select a category to delete.');
  }
}

function loadCategoriesToDelete() {
  var categorySelectorToDelete = document.getElementById('categorySelectorToDelete');
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  categorySelectorToDelete.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var option = document.createElement('option');
    option.text = category.name;
    categorySelectorToDelete.add(option);
  });
}

function loadProductsToDelete() {
  var categorySelectorDeleteProduct = document.getElementById('categorySelectorDeleteProduct');
  var selectedCategoryIndex = categorySelectorDeleteProduct.selectedIndex;
  var productSelector = document.getElementById('productSelector');
  productSelector.innerHTML = '';

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    var selectedCategory = categoriesAndProducts[selectedCategoryIndex];

    selectedCategory.products.forEach(function (product, index) {
      var option = document.createElement('option');
      option.text = product.name;
      option.value = index;
      productSelector.add(option);
    });
  }
}

function deleteProduct() {
  var categorySelectorDeleteProduct = document.getElementById('categorySelectorDeleteProduct');
  var selectedCategoryIndex = categorySelectorDeleteProduct.selectedIndex;
  var productSelector = document.getElementById('productSelector');
  var selectedProductIndex = productSelector.value;

  if (selectedCategoryIndex !== -1 && selectedProductIndex !== '') {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts[selectedCategoryIndex].products.splice(selectedProductIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
  } else {
    alert('Please select a category and a product to delete.');
  }
}
