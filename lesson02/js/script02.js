"use strict"

/**
 * Класс: список товаров
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

    /**
     * Task 2
     * Метод вычисляет суммарную стоимость всех товаров
     */
    calculateTotalCost() {
        // Вычислить стоимость всех товаров
        let totalCost = this.goods.reduce((total, item, index, srcList) => {
            return total + item.price;
        }, 0);

        return totalCost;
    }

    /**
     * Метод для вывода общей стоимости всех товаров
     */
    renderTotalCost() {
        const divTotalCost = document.querySelector('.total-cost');
        const info = `Общая стоимость всех товаров: ${this.calculateTotalCost()}`;
        divTotalCost.insertAdjacentHTML("beforeend", info);
    }
}

/**
 * Класс: товара
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

// Task 1
/**
 * Класс: корзины товаров
 */
class Cart {
    constructor() {
        // Массив объектов класса ProductInCart в корзине
        this.productList = [];
    }

    addProduct(productId) {
    }

    removeProduct(productId) {
    }

    /**
     * Метод вычисляет суммарную стоимость всех товаров в корзине
     */
    calculateTotalCost() {
        // Вычислить стоимость всех товаров в корзине
        let totalCost = this.productList.reduce((total, item, index, srcList) => {
            return total + item.price * item.amount;
        }, 0);

        return totalCost;
    }

    /**
     * Метод удаляет все товары из корзины
     */
    clear() {
        this.productList.splice(0, this.productList.length);
    }
}

/**
 * Класс: элемент в корзине товаров
 */
class ProductInCart {
    constructor() {
        this.id = null;
        this.title = null; // Необязательно
        this.price = null; // Необязательно
        // Количество конкретного товара в корзине
        this.amount = 0;
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
        // Выводим общую стоимость всех товаров
        productList.renderTotalCost();
    }
}

export {
    Lesson02
};