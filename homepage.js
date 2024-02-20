document.addEventListener('DOMContentLoaded', function () {
  loadCategoriesAndProducts();
});

function loadCategoriesAndProducts() {
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  var categoriesAndProductsContainer = document.getElementById('categoriesAndProducts');
  categoriesAndProductsContainer.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var categoryElement = document.createElement('div');
    categoryElement.innerHTML = '<h3>' + category.name + '</h3>';

    if (category.products.length > 0) {
      var productList = document.createElement('ul');

      category.products.forEach(function (product) {
        var productItem = document.createElement('li');
        productItem.textContent = product.name + ': $' + product.price;
        productList.appendChild(productItem);
      });

      categoryElement.appendChild(productList);
    }

    categoriesAndProductsContainer.appendChild(categoryElement);
  });
}
