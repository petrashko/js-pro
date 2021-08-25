"use strict"

import {Cart, ProductInCart} from './cart03.js';

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Класс: список товаров
 */
class ProductList {
    constructor(container='.product-items') {
        this.container = container;
        this.goods = [];
        this._fetchProducts()
            .then(data => { // data: объект-JSON
                this.goods = [...data];
                // Выводим список товаров на HTML-страницу
                this.render();
                // Выводим общую стоимость всех товаров
                this.renderTotalCost();
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
    //constructor(product, imgSrc='https://via.placeholder.com/200x150') {
    constructor(product) {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
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