function login() {
  var usernameInput = document.getElementById('username');
  var passwordInput = document.getElementById('password');
  var loginForm = document.getElementById('loginForm');
  var dashboard = document.getElementById('dashboard');

  if (usernameInput.value === 'tasos' && passwordInput.value === '12345') {
    loginForm.style.display = 'none';
    dashboard.style.display = 'block';
    loadCategories();
  } else {
    alert('Invalid username or password');
  }

  // Prevent form submission
  return false;
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
    categoriesAndProducts[selectedCategoryIndex].products.push({ name: productName, price: productPrice, hidden: false });
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
  } else {
    alert('Please select a category.');
  }
}

function deleteCategory() {
  var categorySelector = document.getElementById('categoryToDelete');
  var selectedCategoryIndex = categorySelector.selectedIndex;

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    categoriesAndProducts.splice(selectedCategoryIndex, 1);
    localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));
    loadCategories();
    loadProducts(); // update the product selector after category deletion
  } else {
    alert('Please select a category to delete.');
  }
}

function deleteProduct() {
  var categorySelector = document.getElementById('categoryForProductToDelete');
  var selectedCategoryIndex = categorySelector.selectedIndex;
  var productSelector = document.getElementById('productToDelete');
  var selectedProductIndex = productSelector.selectedIndex;

  if (selectedCategoryIndex !== -1 && selectedProductIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    var selectedCategory = categoriesAndProducts[selectedCategoryIndex];

    var selectedProduct = selectedCategory.products[selectedProductIndex];

    var confirmDelete = confirm("Are you sure you want to delete the product '" + selectedProduct.name + "'?");
    if (confirmDelete) {
      // Instead of directly deleting, mark as hidden
      selectedProduct.hidden = true;
      localStorage.setItem('categoriesAndProducts', JSON.stringify(categoriesAndProducts));

      // Refresh the product selector immediately to include both visible and hidden products
      loadProducts();
    }
  } else {
    alert('Please select a category and a product to delete.');
  }
}


function loadCategories() {
  var categorySelector = document.getElementById('categorySelector');
  var categoryToDeleteSelector = document.getElementById('categoryToDelete');
  var categoryForProductToDeleteSelector = document.getElementById('categoryForProductToDelete');

  if (categorySelector && categoryToDeleteSelector && categoryForProductToDeleteSelector) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];

    categorySelector.innerHTML = '';
    categoryToDeleteSelector.innerHTML = '';
    categoryForProductToDeleteSelector.innerHTML = '';

    categoriesAndProducts.forEach(function (category) {
      var option = document.createElement('option');
      option.text = category.name;

      categorySelector.add(option);
      categoryToDeleteSelector.add(option.cloneNode(true));
      categoryForProductToDeleteSelector.add(option.cloneNode(true));
    });
  } else {
    console.error("Category selectors not found.");
  }
}

function loadProducts() {
  var categorySelector = document.getElementById('categoryForProductToDelete');
  var selectedCategoryIndex = categorySelector.selectedIndex;
  var productSelector = document.getElementById('productToDelete');

  if (selectedCategoryIndex !== -1) {
    var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
    var selectedCategory = categoriesAndProducts[selectedCategoryIndex];

    productSelector.innerHTML = '';

    // Iterate through visible products and add them to the dropdown
    selectedCategory.products
      .filter(product => !product.hidden)
      .forEach(function (product) {
        var option = document.createElement('option');
        option.text = product.name;
        productSelector.add(option);
      });
  } else {
    productSelector.innerHTML = '';
  }
}

