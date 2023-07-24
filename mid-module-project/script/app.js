/*
    app.js

*/



document.addEventListener('DOMContentLoaded', () => {
    let allProducts = productService.getProducts();
    for(let product of allProducts) {
        let card = makeProductCard(product);
        document.getElementById('product-cards').appendChild(card);
  
    }

    let searchBox = document.getElementById('search-box');
    searchBox.addEventListener('keyup', (e) => {
        document.getElementById('product-cards').innerHTML = '';

        let allProducts;
        if(searchBox.value == '')
            allProducts = productService.getProducts();
        else 
            allProducts = productService.searchProducts(searchBox.value);
            
        for(let product of allProducts) {
            let card = makeProductCard(product);
            document.getElementById('product-cards').appendChild(card);
        }
    })
});

function makeProductCard(product) {
    let article = document.createElement('article');
    article.classList.add('product-card');

    let sku = document.createElement('div');
    sku.classList.add('sku');
    sku.innerText = product.productSku;
    article.appendChild(sku);

    let price = document.createElement('div');
    price.classList.add('price');
    price.innerText = currencyFormatting(product.price);
    article.appendChild(price);

    let productName = document.createElement('div');
    productName.classList.add('product-name');
    productName.classList.add('action');
    productName.innerText = product.name;
    productName.setAttribute("data-id", product.productId);
    productName.addEventListener('click', (ev) => {
        const id = Number(ev.currentTarget.getAttribute('data-id'));
        let allProducts = productService.getProducts();
        let product = allProducts.find((p) => 
            p.productId == id
        );
        showMessage(product.description);
    })
    article.appendChild(productName);

    let productImage = document.createElement('div');
    productImage.classList.add('product-image');
    let img = document.createElement('img');
    img.setAttribute('src', product.imageName);
    productImage.appendChild(img);
    article.appendChild(productImage);

    let cart = document.createElement('div');
    cart.classList.add('cart');
    let cartImage = document.createElement('i');
    cartImage.classList.add('fa-solid');
    cartImage.classList.add('fa-cart-plus');
    cartImage.classList.add('icon');
    cartImage.classList.add('action');
    cartImage.setAttribute('title', 'add item to cart');
    cartImage.addEventListener('click', () => {
        showMessage(product.name + ' has been added to cart');
    })
    cart.appendChild(cartImage);
    article.appendChild(cart);

    return article;
}   

function currencyFormatting(value){
    return new Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
    }).format(value);
}

function showMessage(msg) {
    let messageArea = document.getElementById('message-area');
    messageArea.innerText = msg;
}