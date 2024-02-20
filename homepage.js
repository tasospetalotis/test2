document.addEventListener('DOMContentLoaded', function () {
  loadCategoriesAndProducts();
});

// Add this function to the homepage.js file
function loadHomepage() {
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  var categoriesAndProductsDiv = document.getElementById('categoriesAndProducts');
  categoriesAndProductsDiv.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h2>${category.name}</h2>`;
    category.products.forEach(function (product) {
      categoryDiv.innerHTML += `<p>${product.name} - $${product.price}</p>`;
    });
    categoriesAndProductsDiv.appendChild(categoryDiv);
  });
}

// Load homepage when the page is loaded
loadHomepage();


function loadCategoriesAndProducts() {
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  var categoriesAndProductsDiv = document.getElementById('categoriesAndProducts');
  categoriesAndProductsDiv.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var categoryHeading = document.createElement('h3');
    categoryHeading.textContent = category.name;
    categoriesAndProductsDiv.appendChild(categoryHeading);

    var productList = document.createElement('ul');
    category.products.forEach(function (product) {
      var listItem = document.createElement('li');
      listItem.textContent = `${product.name} - $${product.price}`;
      productList.appendChild(listItem);
    });

    categoriesAndProductsDiv.appendChild(productList);
  });
}
