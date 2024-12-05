var ProductNameInput = document.getElementById('ProductNameInput');
var ProductPriceInput = document.getElementById('ProductPriceInput');
var ProductCategoryInput = document.getElementById('ProductCategoryInput');
var ProductDescriptionInput = document.getElementById('ProductDescriptionInput');
var productContainer;
var btnAdd = document.getElementById('btnAdd');
var btnUpdate = document.getElementById('btnUpdate');
var currentUpdateIndex = -1; // Variable to store the index of the product being updated

if (localStorage.getItem('myProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productContainer);
} else {
    productContainer = [];
}

function addProduct() {
    var product = {
        name: ProductNameInput.value,
        price: ProductPriceInput.value,
        category: ProductCategoryInput.value,
        desc: ProductDescriptionInput.value,
    };
    productContainer.push(product);
    localStorage.setItem('myProducts', JSON.stringify(productContainer));
    clearProduct();
    displayProducts(productContainer);
}

function clearProduct() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescriptionInput.value = "";
}

function displayProducts(productList) {
    var cartoona = ``;
    for (let i = 0; i < productList.length; i++) {
        cartoona += `<tr>
              <th scope="row">${i + 1}</th>
              <td>${productList[i].name}</td>
              <td>${productList[i].price}</td>
              <td>${productList[i].category}</td>
              <td>${productList[i].desc}</td>
              <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning">Update</button></td>
              <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = cartoona;
}

function searchProduct(searchTerm) {
    var searchResult = [];
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
            searchResult.push(productContainer[i]);
        }
    }
    displayProducts(searchResult);
}

function deleteProduct(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productContainer));
    displayProducts(productContainer);
}

function setFormForUpdate(updateIndex) {
    currentUpdateIndex = updateIndex; 
    ProductNameInput.value = productContainer[updateIndex].name;
    ProductPriceInput.value = productContainer[updateIndex].price;
    ProductCategoryInput.value = productContainer[updateIndex].category;
    ProductDescriptionInput.value = productContainer[updateIndex].desc;

    btnUpdate.classList.remove('d-none');
    btnAdd.classList.add('d-none');
}

function updateProduct() {
    if (currentUpdateIndex !== -1) {
        productContainer[currentUpdateIndex] = {
            name: ProductNameInput.value.trim(),
            price: ProductPriceInput.value.trim(),
            category: ProductCategoryInput.value.trim(),
            desc: ProductDescriptionInput.value.trim(),
        };

        localStorage.setItem('myProducts', JSON.stringify(productContainer));

        displayProducts(productContainer);
        clearProduct();

        btnUpdate.classList.add('d-none');
        btnAdd.classList.remove('d-none');

        currentUpdateIndex = -1;   
    } else {
        console.error("No product selected for update.");
    }
}
