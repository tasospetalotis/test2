// Load data from JSON
let data;
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    displayCategoriesAndProducts();
  });

function displayCategoriesAndProducts() {
  const categoriesAndProducts = document.getElementById('categoriesAndProducts');
  data.categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h3>${category.name}</h3>`;
    if (category.products.length > 0) {
      const productList = document.createElement('ul');
      category.products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productList.appendChild(listItem);
      });
      categoryDiv.appendChild(productList);
    } else {
      categoryDiv.innerHTML += '<p>No products available.</p>';
    }
    categoriesAndProducts.appendChild(categoryDiv);
  });
}
