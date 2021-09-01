"use strict"

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Класс: корзины товаров
 */
class Cart {
    constructor(container='.cart-item-list') {
        this.container = container;
        //
        this.cost = 0;
        this.goodsCount = 0;
        // Массив объектов класса ProductInCart в корзине
        this.goods = [];

        // Кнопка "Очистить корзину"
        const buttonClearCart = document.querySelector('.clear-cart-btn');
        if (buttonClearCart) {
            buttonClearCart.addEventListener('click', (ev) => { this.clear(ev) });
        }
    }

    getProductsFromServer() {
        if (0 === this.goods.length) {
            this._fetchProducts()
            .then(data => { // data: объект-JSON
                //console.log(data);
                this.cost = data.amount;
                this.goodsCount = data.countGoods;
                //
                for (let product of data.contents) {
                    const prod = new ProductInCart(product);
                    this.goods.push(prod);
                }
                //console.log(this.goods);

                // Обновить информацию на HTML-странице
                this._updatePageHTML();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    /**
     * Метод для получения списка товаров с сервера
     */
    _fetchProducts() {
        //const promise = fetch(`${API}/getBasket.json`)
        // Получаем данные из локального JSON-файла
        const promise = fetch('data/basketData.json')
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
     * product: Товар из каталога товаров (класса ProductList)
     */
    addProduct(product) {
        let productInCart = this.goods.find((item, index, srcList) => {
            return parseInt(item.id) === parseInt(product.id_product);
        });

        // Если такой товар уже есть в корзине
        if (productInCart) {
            productInCart.amount++;
        }
        // Иначе, добавить новый товар в корзину
        else {
            const newProductInCart = new ProductInCart(product);
            this.goods.push(newProductInCart);
        }

        // Обновить информацию на HTML-странице
        this._updatePageHTML();
    }

    removeProduct(ev) {
        ev.preventDefault();

        const btn = ev.target.closest('button');
        const productId = btn.dataset.productId;
        // Найти товар в корзине
        let productInCart = this.goods.find((item, index, srcList) => {
            return parseInt(item.id) === parseInt(productId);
        });

        if (productInCart.amount > 1) {
            productInCart.amount--;
        }
        else {
            // Удалить товар из корзины
            this.goods.splice(this.goods.indexOf(productInCart), 1);
        }

        // Обновить информацию на HTML-странице
        this._updatePageHTML();
    }

    /**
     * Метод удаляет все товары из корзины
     */
    clear(ev) {
        ev.preventDefault();
        this.goods.splice(0, this.goods.length);
        
        // Обновить информацию на HTML-странице
        this._updatePageHTML();
    }

    /**
     * Метод обновляет информацию на HTML-странице
     */
    _updatePageHTML() {
        // Выводим количество всех товаров в корзине
        this.renderGoodsCount();
        // Выводим суммарную стоимость всех товаров в корзине
        this.renderTotalCost();
        // Выводим список товаров на HTML-страницу
        this.renderGoods();
    }

    /**
     * Метод вычисляет суммарную стоимость всех товаров в корзине
     */
    calculateTotalCost() {
        this.cost = this.goods.reduce((total, item, index, srcList) => {
            return total + item.price * item.amount;
        }, 0);

        return this.cost;
    }

    /**
     * Метод для вывода суммарной стоимости всех товаров в корзине
     */
    renderTotalCost() {
        const spanTotalCostList = document.querySelectorAll('.order-total-cost');
        if (spanTotalCostList.length > 0) {
            const totalCost = this.calculateTotalCost();

            spanTotalCostList.forEach((item, index, srcList) => {
                item.textContent = totalCost;
            });
        }
    }

    /**
     * Метод вычисляет количество всех товаров в корзине
     */
    calculateGoodsCount() {
        this.goodsCount = this.goods.reduce((total, item, index, srcList) => {
            return total + item.amount;
        }, 0);

        return this.goodsCount;
    }

    /**
     * Метод для вывода количества всех товаров в корзине
     */
    renderGoodsCount() {
        const spanBasketGoodsCount = document.getElementById('basket-goods-count');
        
        if (spanBasketGoodsCount) {
            const goodsCount = this.calculateGoodsCount();
            spanBasketGoodsCount.textContent = goodsCount;
        }
    }

    /**
     * Метод для вывода списка товаров
     */
    renderGoods() {
        const divCartItems = document.querySelector(this.container);
        if (null === divCartItems) {
            return;
        }
        divCartItems.innerHTML = '';

        if (divCartItems) {
            for (let productInCart of this.goods) {
                divCartItems.insertAdjacentHTML("beforeend", productInCart.render());
            }
        }

        // Список кнопок "Удалить из корзины" для каждого товара
        const buttonList = divCartItems.querySelectorAll('.btn-del-item');
        // Добавить обработчики
        for (let btn of buttonList) {
            btn.addEventListener('click', ev => { this.removeProduct(ev) });
        }
    }
}

/**
 * Класс: элемент в корзине товаров
 */
class ProductInCart {
    //constructor(product, imgSrc='https://via.placeholder.com/200x150') {
    constructor(product) {
        this.id = +product.id_product;
        this.title = product.product_name;
        this.price = +product.price;
        this.imgSrc = `../images/imgProd-${product.id_product}.jpg`;
        // Количество конкретного товара в корзине
        if (product.quantity) {
            this.amount = +product.quantity;
        }
        else {
            this.amount = 1;
        }
    }

    /**
     * Метод для формирования верстки карточки товара
     */
    render() {
        return (
            `<div class="cart-item">
                <div class="cart-item-image">
                    <img src="${this.imgSrc}" height="18" alt="picture" />
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-info-caption">${this.title}</h3>
                    <p class="info-paragraf">Price: <span class="cart-item-price">$${this.price}</p>
                    <p class="info-paragraf">
                        Описание товара: Lorem ipsum, dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor ncididunt ut labore et dolore magna aliqua.
                    </p>
                    <p class="info-paragraf">Quantity:
                        <input type="number" value="${this.amount}" readonly />
                    </p>
                </div>
                <div class="div-btn-close">
                    <button class="cart-item-btn-close btn-del-item" data-product-id="${this.id}">
                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"/>
                        </svg>
                    </button>
                </div>
            </div>`
        );
    }
}

//*******************************************************************

export {
    Cart,
    ProductInCart
};