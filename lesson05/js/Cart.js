"use strict"

import { ProductItem, ProductInCart } from './ProductItem.js';

const Cart = {
    //
    //props: ['updateCart'],
    
    //
    data() {
        return {
            productList: [],
        }
    },

    computed: {
        cost() {
            const result = this.productList.reduce((total, item, index, srcList) => {
                return total + item.price * item.amount;
            }, 0);

            return result;
        }
    },

    methods: {
        /**
         * Метод возвращает пользователя в каталог товаров
         */
        continueShopping($event) {
            this.$emit('shopping', $event);
        },

        /**
         * Метод удаляет выбранный товар из корзины
         */
        onRemoveProduct(ev) {
            ev.preventDefault();
    
            const btn = ev.target.closest('button');
            const productId = btn.dataset.productId;
            // Найти товар в корзине
            let productInCart = this.productList.find((item, index, srcList) => {
                return parseInt(item.id) === parseInt(productId);
            });
    
            if (productInCart.amount > 1) {
                productInCart.amount--;
            }
            else {
                // Удалить товар из корзины
                this.productList.splice(this.productList.indexOf(productInCart), 1);
            }
    
            window.myGlobal.cartList = this.productList;
            //console.log(window.myGlobal.cartList);
            this.$emit('update-cart');

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },

        /**
         * Метод удаляет все товары из корзины
         */
        onClear(ev) {
            ev.preventDefault();
            this.productList.splice(0, this.productList.length);
            
            window.myGlobal.cartList = this.productList;
            //console.log(window.myGlobal.cartList);
            this.$emit('update-cart');
        },

        /**
         * Метод для получения списка товаров с сервера
         */
        fetchProductList(url) {
            //const promise = fetch(`${API}/catalogData.json`)
            // Получаем данные из локального JSON-файла
            const promise = fetch(url)
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
        },

        getProductList() {
            this.fetchProductList('data/basketData.json')
                .then(data => { // data: объект-JSON
                    //this.productList = data.contents.map(item => new ProductInCart(item));
                    this.productList.splice(0, this.productList.length);
                    data.contents.forEach(item => {
                        this.productList.push( new ProductInCart(item) );
                        window.myGlobal.cartList = this.productList;
                    });
                    
                    console.log(window.myGlobal.cartList);
                    this.$emit('update-cart');
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },

    // Загрузить данные с сервера
    mounted() {
        if (true === window.myGlobal.isCart) {
            this.productList = window.myGlobal.cartList;
            return;
        }
        // Получить список товаров с сервера, которые находятся в корзине
        this.getProductList();

        window.myGlobal.isCart = true;
    },

    //
    template: (
        `<!-- Основную часть страницы делим на левый и правый блоки -->
        <section class="container cart-main">
            <div class="cart-main-left">
                <!-- Блоки с товаром, которые есть в корзине -->
                <div class="cart-item-list">
                    <!-- Здесь динамически добавляются карточки с товаром -->
                    <div class="cart-item" v-for="product of productList" :key="product.id">
                        <div class="cart-item-image">
                            <img v-bind:src="product.imgSrc" height="18" alt="picture" />
                        </div>
                        <div class="cart-item-info">
                            <h3 class="cart-item-info-caption">{{product.title}}</h3>
                            <p class="info-paragraf">Price: <span class="cart-item-price">$ {{product.price}}</span></p>
                            <p class="info-paragraf">
                                Описание товара: Lorem ipsum, dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor ncididunt ut labore et dolore magna aliqua.
                            </p>
                            <p class="info-paragraf">Quantity:
                                <input type="number" v-bind:value="product.amount" readonly />
                            </p>
                        </div>
                        <div class="div-btn-close">
                            <button class="cart-item-btn-close btn-del-item"
                                    v-bind:data-product-id="product.id"
                                    v-on:click="onRemoveProduct($event)">
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Если корзина пустая - показать сообщение -->
                <p class="text-center" v-if="productList.length < 1">Пустая корзина</p> 

                <!-- Блок с двумя кнопками -->
                <div class="shopping-buttons">
                    <button class="shopping-buttons-btn clear-cart-btn"
                        v-on:click="onClear($event)">Очистить корзину</button>
                    <button class="shopping-buttons-btn"
                        v-on:click="continueShopping($event)">Перейти в каталог</button>
                </div>
            </div>
            <div class="cart-main-right">
                <!-- Форма заказа -->
                <div class="order-form">
                    <form action="#" class="order-form-main">
                        <h4 class="order-form-main-caption">SHIPPING ADRESS</h4>
                        <input type="text" id="country" name="country" class="order-form-main-country" placeholder="Bangladesh" />
                        <input type="text" id="state" name="state" class="order-form-main-zip" placeholder="State" />
                        <input type="text" id="zip" name="zip" class="order-form-main-zip" placeholder="Postcode \ Zip" />
                        <button type="submit" class="order-form-main-submit">GET A QUOTE</button>
                    </form>
                </div>
                <!-- Общая информация о заказе -->
                <div class="order-total">
                    <p class="order-total-sub">sub total <span class="order-total-cost">$ {{ cost }}</span></p>
                    <p class="order-total-grand">Общая стоимость заказа: <span class="order-total-cost" style="color: #F16D7F;">$ {{ cost }}</span></p>
                    <hr />
                    <button class="order-total-btn">procced to checkout</button>
                </div>
            </div>
        </section>`
    )
}

//*******************************************************************

export {
    Cart
}