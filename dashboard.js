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
