// homepage.js

document.addEventListener("DOMContentLoaded", function () {
  // Load categories and products from localStorage
  const storedData = localStorage.getItem('categoriesAndProducts');
  const categoriesAndProducts = storedData ? JSON.parse(storedData) : [];

  // Display categories and products on the homepage
  displayCategoriesAndProducts(categoriesAndProducts);
});

function displayCategoriesAndProducts(categoriesAndProducts) {
  // Your code to display categories and products on the homepage
  var displayDiv = document.getElementById('categoriesAndProducts');
  displayDiv.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h3>${category.name}</h3>`;

    if (category.products.length > 0) {
      var productList = document.createElement('ul');

      category.products.forEach(function (product) {
        var productItem = document.createElement('li');
        productItem.textContent = `${product.name}: $${product.price.toFixed(2)}`;
        productList.appendChild(productItem);
      });

      categoryDiv.appendChild(productList);
    } else {
      categoryDiv.innerHTML += '<p>No products in this category</p>';
    }

    displayDiv.appendChild(categoryDiv);
  });
}
