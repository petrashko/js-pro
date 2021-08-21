"use strict"


/**
 * Класс со списком товаров
 */
class ProductList {
    constructor(container='.product-items') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        // Вывод товаров на страницу
        //this.render();
    }

    /**
     * Метод (заглушка) для получения списка товаров с сервера
     */
    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    /**
     * Метод для вывода списка товаров
     */
    render() {
        const divProducts = document.querySelector(this.container);

        for (let product of this.goods) {
            const item = new ProductItem(product);
            divProducts.insertAdjacentHTML("beforeend", item.render());
        }
    }
}

/**
 * Класс товара
 */
class ProductItem {
    //constructor(product, img='https://via.placeholder.com/200x150') {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.imgSrc = `../images/imgProd-${product.id}.jpg`;
    }

    /**
     * Метод для формирования верстки карточки товара
     */
    render() {
        return (
            `<article>
                <div class="product-card">
                    <img src="${this.imgSrc}" alt="picture" />
                    <h3 class="product-name">
                        <a href="product.html">${this.title}</a>
                    </h3>
                    <p class="product-description">
                        Описание товара Lorem ipsum, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        ncididunt ut labore et dolore magna aliqua.
                    </p>
                    <strong class="product-price">$${this.price}</strong>
                    <div class="product-img-overlay text-center">
                        <button class="btn-add-card" data-product-id="${this.id}">Добавить в корзину</button>
                    </div>
                </div>
            </article>`
        );
    }
}

//*******************************************************************

const Lesson02 = {
    run: () => {
        console.log('Lesson 2');
        console.log();
        let productList = new ProductList('.product-items');
        // Выводим список товаров на HTML-страницу
        productList.render();
    }
}

export {
    Lesson02
};