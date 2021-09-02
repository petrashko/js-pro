"use strict"

import { ProductItem, ProductInCart } from './ProductItem.js';

const Catalog = {
    //
    //props: ['updateCatalog'],

    //
    data() {
        return {
            productList: [],
            strSearch: '',
        }
    },

    computed: {
        filteredList() {
            if (0 === this.strSearch.trim().length) {
                return this.productList;
            }

            const regexp = new RegExp(this.strSearch.trim(), 'i');
            return this.productList.filter(item => regexp.test(item.title));
        }
    },

    //
    methods: {
        // Поиск товаров
        onSearch(ev) {
            ev.preventDefault();
            this.strSearch = this.$refs.inputSearch.value.trim();
            //console.log(this.strSearch);
        },

        /**
         * Обработчик для кнопок "Добавить в корзину"
         */
        handlerAddToCart(ev) {
            ev.preventDefault();

            const productId = ev.target.dataset.productId;
            //console.log(productId);

            let productInCart = window.myGlobal.cartList.find((item, index, srcList) => {
                return item.id === parseInt(productId);
            });
    
            // Если такой товар уже есть в корзине
            if (productInCart) {
                productInCart.amount++;
            }
            // Иначе, добавить новый товар в корзину
            else {
                let product = this.productList.find((item, index, srcList) => {
                    return item.id === parseInt(productId);
                });
                //
                const productObj = {
                    id_product: product.id,
                    product_name: product.title,
                    price: product.price,
                };

                const newProductInCart = new ProductInCart(productObj);
                window.myGlobal.cartList.push(newProductInCart);
            }

            //console.log(window.myGlobal.cartList);
            this.$emit('update-cart');

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
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

        getProductList() {window.myGlobal
            this.fetchProductList('data/catalogData.json')
                .then(data => { // data: объект-JSON
                    //this.productList = data.map(item => new ProductItem(item));
                    this.productList.splice(0, this.productList.length);
                    data.forEach(item => {
                        this.productList.push( new ProductItem(item) );
                        window.myGlobal.catalogList = this.productList;
                    });
      
                    console.log(window.myGlobal.catalogList);
                    this.$emit('update-catalog');
                })
                .catch(error => {
                    console.log(error);
                });
        },

        getCartProductList() {
            this.fetchProductList('data/basketData.json')
                .then(data => { // data: объект-JSON
                    window.myGlobal.cartList.splice(0, window.myGlobal.cartList.length);
                    data.contents.forEach(item => {
                        window.myGlobal.cartList.push( new ProductInCart(item) );
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
        if (true === window.myGlobal.isCatalog) {
            this.productList = window.myGlobal.catalogList;
            return;
        }
        // Получить список товаров с сервера
        this.getProductList();

        window.myGlobal.isCatalog = true;

        //***********************************************************

        if (true === window.myGlobal.isCart) {
            return;
        }
        // Получить список товаров с сервера, которые находятся в корзине
        this.getCartProductList();

        window.myGlobal.isCart = true;
    },

    //
    template: (
        `<!-- Блок с карточками товаров -->
        <section class="products-section">
            <div class="text-center">
                <form action="#" class="search-form">
                    <input type="text" class="search-field" v-bind:value="strSearch" ref="inputSearch">
                    <button class="btn-search" type="submit" v-on:click="onSearch($event)">Найти</button>
                </form>
            </div>
            <div class="container products">
                <!-- Блок для вывода суммарной стоимость всех товаров -->
                <div class="text-center total-cost"></div>
                <div class="product-items">
                    <!-- Здесь динамически добавляются карточки с товаром -->
                    <article v-for="product of filteredList" :key="product.id">
                        <div class="product-card">
                            <img v-bind:src="product.imgSrc" alt="picture" />
                            <h3 class="product-name">
                                <a href="product.html">{{product.title}}</a>
                            </h3>
                            <p class="product-description">
                                Описание товара: Lorem ipsum, dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                ncididunt ut labore et dolore magna aliqua.
                            </p>
                            <strong class="product-price">$ {{product.price}}</strong>
                            <div class="product-img-overlay text-center">
                                <button class="btn-add-card"
                                    v-bind:data-product-id="product.id"
                                    v-on:click="handlerAddToCart($event)">Добавить в корзину</button>
                            </div>
                        </div>
                    </article>
                </div>

                <!-- Если товаров нет - показать сообщение -->
                <p class="text-center" v-if="filteredList.length < 1">По вашему зарпросу ничего не найдено</p> 
                
                <!--
                <button class="cart-btn" type="button">Корзина</button>
                -->
            </div>
            <!-- END: div class="container products" -->
        </section>`
    )
}

//*******************************************************************

export {
    Catalog
}