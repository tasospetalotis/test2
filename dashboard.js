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
  var categorySelector = document.getElementById('categorySelector');
  var option = document.createElement('option');
  option.text = categoryName;
  categorySelector.add(option);
}

function addProduct() {
  var categorySelector = document.getElementById('categorySelector');
  var selectedCategory = categorySelector.options[categorySelector.selectedIndex].text;
  var productName = document.getElementById('productName').value;
  var productPrice = document.getElementById('productPrice').value;

  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || {};
  if (!categoriesAndProducts[selectedCategory]) {
    categoriesAndProducts[selectedCategory] = [];
  }
  categoriesAndProducts[selectedCategory].push({ name: productName, price: productPrice });

  localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));

  loadCategories();
}

function loadCategories() {
  var categorySelector = document.getElementById('categorySelector');
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || {};
  categorySelector.innerHTML = '';

  for (var category in categoriesAndProducts) {
    var option = document.createElement('option');
    option.text = category;
    categorySelector.add(option);
  }
}
