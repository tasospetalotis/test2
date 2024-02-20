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

function deleteCategoryOrProduct() {
  var deleteSelector = document.getElementById('deleteSelector');
  var selectedDeleteIndex = deleteSelector.selectedIndex;

  if (selectedDeleteIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    
    if (deleteSelector.options[selectedDeleteIndex].classList.contains('category')) {
      // Deleting a category
      categoriesAndProducts.splice(selectedDeleteIndex, 1);
    } else {
      // Deleting a product
      var selectedCategoryIndex = document.getElementById('categorySelector').selectedIndex;
      categoriesAndProducts[selectedCategoryIndex].products.splice(selectedDeleteIndex, 1);
    }

    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
  } else {
    alert('Please select a category or product to delete.');
  }
}

function loadCategories() {
  var categorySelector = document.getElementById('categorySelector');
  var deleteSelector = document.getElementById('deleteSelector');
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  categorySelector.innerHTML = '';
  deleteSelector.innerHTML = '';

  categoriesAndProducts.forEach(function (category, categoryIndex) {
    var option = document.createElement('option');
    option.text = category.name;
    categorySelector.add(option);

    // Adding products to delete dropdown
    var optgroup = document.createElement('optgroup');
    optgroup.label = category.name;

    category.products.forEach(function (product, productIndex) {
      var productOption = document.createElement('option');
      productOption.text = product.name;
      optgroup.add(productOption);
    });

    deleteSelector.add(optgroup);
  });
}
