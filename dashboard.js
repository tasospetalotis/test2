// Load data from JSON
let data;
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    populateCategorySelector();
  });

function populateCategorySelector() {
  const categorySelector = document.getElementById('categorySelector');
  data.categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    categorySelector.appendChild(option);
  });
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'tasos' && password === '12345') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  } else {
    alert('Invalid username or password');
  }
}

function addCategory() {
  const categoryName = document.getElementById('categoryName').value;
  data.categories.push({ name: categoryName, products: [] });
  populateCategorySelector();
}

function addProduct() {
  const categorySelector = document.getElementById('categorySelector');
  const selectedCategory = categorySelector.value;
  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);

  const category = data.categories.find(cat => cat.name === selectedCategory);
  if (category) {
    category.products.push({ name: productName, price: productPrice });
  }
}
