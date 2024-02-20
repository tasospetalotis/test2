// homepage.js

document.addEventListener("DOMContentLoaded", function () {
  // Load categories from localStorage
  const storedCategories = localStorage.getItem('categories');
  const categories = storedCategories ? JSON.parse(storedCategories) : [];

  // Display categories and products
  displayCategoriesAndProducts(categories);
});

function displayCategoriesAndProducts(categories) {
  var categoriesAndProductsContainer = document.getElementById('categoriesAndProducts');
  categoriesAndProductsContainer.innerHTML = '';

  categories.forEach(function (category) {
    var categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

    var productList = document.createElement('ul');

    category.products.forEach(function (product) {
      var listItem = document.createElement('li');
      listItem.textContent = `${product.name}: $${product.price.toFixed(2)}`;
      productList.appendChild(listItem);
    });

    categoryDiv.appendChild(productList);
    categoriesAndProductsContainer.appendChild(categoryDiv);
  });
}
