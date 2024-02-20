document.addEventListener('DOMContentLoaded', function () {
  loadCategoriesAndProducts();
});

function loadCategoriesAndProducts() {
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || {};
  var categoriesAndProductsDiv = document.getElementById('categoriesAndProducts');
  categoriesAndProductsDiv.innerHTML = '';

  for (var category in categoriesAndProducts) {
    var categoryHeading = document.createElement('h3');
    categoryHeading.textContent = category;
    categoriesAndProductsDiv.appendChild(categoryHeading);

    var productList = document.createElement('ul');
    categoriesAndProducts[category].forEach(function (product) {
      var listItem = document.createElement('li');
      listItem.textContent = `${product.name} - $${product.price}`;
      productList.appendChild(listItem);
    });

    categoriesAndProductsDiv.appendChild(productList);
  }
}
