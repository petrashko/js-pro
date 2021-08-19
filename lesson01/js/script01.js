"use strict"

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

/**
 * Метод для формирования верстки каждого товара
 */
const renderProduct = (product) => {
    /**
    return (
        `<div class="product-item">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
        </div>`
    );
    **/
    return (
        `<article>
            <div class="product-card">
                <img src="../images/imgProd-${product.id}.jpg" alt="picture" />
                <h3 class="product-name">
                    <a href="product.html">${product.title}</a>
                </h3>
                <p class="product-description">
                    Описание товара Lorem ipsum, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    ncididunt ut labore et dolore magna aliqua.
                </p>
                <strong class="product-price">$${product.price}</strong>
                <div class="product-img-overlay text-center">
                    <button class="btn-add-card" data-product-id="${product.id}">Добавить в корзину</button>
                </div>
            </div>
        </article>`
    );
    /**/
};

/**
 * Метод для вывода списка товаров
 */
const renderProductList = (productList) => {
    const htmlProductList = productList.map((item) => {
        return renderProduct(item)
    });
    //console.log(htmlProductList);
    
    const divProducts = document.querySelector('.product-items');
    // join(''): убрать запятые
    divProducts.innerHTML = htmlProductList.join('');
};


//*******************************************************************

const Lesson01 = {
    run: () => {
        console.log('Lesson 1');
        console.log();
        renderProductList(products);
    }
}

export {
    Lesson01
};