"use strict"

//import {Cart, ProductInCart} from './cart05.js';

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Класс: список товаров
 */
class ProductList {
    constructor(container='.product-items') {
        this.container = container;
        this.goods = [];
        this.filteredProducts = [];

        const searchForm = document.querySelector('.search-form')
        if (searchForm) {
            searchForm.addEventListener('submit', e => {
                e.preventDefault();
                this.filter(searchForm.querySelector('.search-field').value)
            });
        }
    
        this._fetchProducts()
            .then(data => { // data: объект-JSON
                this.goods = [...data];
                for (let item of this.goods) {
                    this.filteredProducts.push(item);
                }
                // Выводим список товаров на HTML-страницу
                this.render();
                // Выводим общую стоимость всех товаров
                this.renderTotalCost();

                // Навешать обработчики на кнопки "Добавить в корзину"
                this.createHandlersAddToCart()
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
     * Метод для получения списка товаров с сервера
     */
    _fetchProducts() {
        //const promise = fetch(`${API}/catalogData.json`)
        // Получаем данные из локального JSON-файла
        const promise = fetch('data/catalogData.json')
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    return response.json();
                }
                else {
                    console.log(`${response.statusText}: ${response.status} error`);
                }
            })
            .catch(error => {
                console.log(error);
            });
        
        return promise;
    }

    /**
     * Метод для поиска товаров через строку поиска
     */
    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredProducts = this.goods.filter(product => regexp.test(product.product_name));
        // Выводим список товаров на HTML-страницу
        this.render();
        // Навешать обработчики на кнопки "Добавить в корзину"
        this.createHandlersAddToCart()
    }

    /**
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

    /**
     * Метод для вывода списка товаров
     */
    render() {
        const divProducts = document.querySelector(this.container);
        divProducts.innerHTML = '';

        for (let product of this.filteredProducts) {
            const  item = new ProductItem(product);
            divProducts.insertAdjacentHTML("beforeend", item.render());
        }
    }

    /**
     * Метод создает обработчики для кнопок "Добавить в корзину"
     */
    createHandlersAddToCart() {
        // div-блок с каталогом товаров
        const divProducts = document.querySelector(this.container);
        // Список кнопок "Добавить в корзину" для каждого товара
        const buttonList = divProducts.querySelectorAll('.btn-add-card');
        //
        for (let btn of buttonList) {
            btn.addEventListener('click', (ev) => { this.handlerAddToCart(ev) });
        }
    }

    /**
     * Обработчик для кнопок "Добавить в корзину"
     */
    handlerAddToCart(ev) {
        ev.preventDefault();

        const productId = ev.target.dataset.productId;
        console.log(productId);
        // Найти товар в каталоге товаров
        let product = this.goods.find((item, index, srcList) => {
            return parseInt(item.id_product) === parseInt(productId);
        });
        console.log(product);
        // Добавить товар в корзину
        window.cart.addProduct(product);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

/**
 * Класс: товара
 */
class ProductItem {
    //constructor(product, imgSrc='https://via.placeholder.com/200x150') {
    constructor(product) {
        this.id = +product.id_product;
        this.title = product.product_name;
        this.price = +product.price;
        this.imgSrc = `../images/imgProd-${product.id_product}.jpg`;
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
                        Описание товара: Lorem ipsum, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
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

export {
    ProductList,
    ProductItem
};