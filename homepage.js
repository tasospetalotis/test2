document.addEventListener('DOMContentLoaded', function () {
  loadCategoriesAndProducts();
});

function loadCategoriesAndProducts() {
  var categoriesAndProducts = JSON.parse(localStorage.getItem('categoriesAndProducts')) || [];
  var categoriesAndProductsDiv = document.getElementById('categoriesAndProducts');
  categoriesAndProductsDiv.innerHTML = '';

  categoriesAndProducts.forEach(function (category) {
    var categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = '<h3>' + category.name + '</h3>';

    if (category.products.length > 0) {
      var productsList = document.createElement('ul');

      category.products.forEach(function (product) {
        var productItem = document.createElement('li');
        productItem.textContent = product.name + ' - $' + product.price;
        productsList.appendChild(productItem);
      });

      categoryDiv.appendChild(productsList);
    } else {
      categoryDiv.innerHTML += '<p>No products available.</p>';
    }

    categoriesAndProductsDiv.appendChild(categoryDiv);
  });
}
