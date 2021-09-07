"use strict";

import { ProductItem, ProductInCart } from './ProductItem.js';

const SearchForm = {
    //
    data() {
        return {
            strSearch: '',
        }
    },

    //
    methods: {
        onSearch($event) {
            this.strSearch = this.$refs.inputSearch.value.trim();
            //console.log(this.strSearch);
            this.$emit('filtering', $event, this.strSearch);
        },
    },

    //
    template: (
        `<div class="text-center">
            <form action="#" class="search-form">
                <input type="text" class="search-field" v-bind:value="strSearch" ref="inputSearch">
                <button class="btn-search" type="submit" v-on:click="onSearch($event)">Найти</button>
            </form>
        </div>`
    )
}

//*******************************************************************

/**
 * Компонент: Карточка товара
 */
const ProductCard = {
    //
    props: ['product'],

    //
    methods: {
        handlerAddToCart($event, product) {
            this.$emit('add', $event, product);
        }
    },

    //
    template: (
        `<div class="product-card">
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
                    v-on:click="handlerAddToCart($event, product)">Добавить в корзину</button>
            </div>
        </div>`
    )
}

//*******************************************************************

const Catalog = {
    //
    props: ['showerror'],
    
    //
    data() {
        return {
            productList: [],
            cartList: [],
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
        searching(ev, value) {
            ev.preventDefault();
            this.strSearch = value;
            //console.log(this.strSearch);
        },

        /**
         * Обработчик для кнопок "Добавить в корзину"
         */
        addToCart(ev, product) {
            ev.preventDefault();

            let productInCart = this.cartList.find((item, index, srcList) => {
                return item.id === product.id;
            });
    
            // Если такой товар уже есть в корзине
            if (productInCart) {
                productInCart.amount++;
            }
            // Иначе, добавить новый товар в корзину
            else {
                const productObj = {
                    id_product: product.id,
                    product_name: product.title,
                    price: product.price,
                };

                const newProductInCart = new ProductInCart(productObj);
                this.cartList.push(newProductInCart);
            }

            this.$emit('update-cart', this.cartList);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },

        getProductList() {
            this.$parent.getJson('/api/products')
                .then(data => { // data: объект-JSON
                    this.productList = data.map(item => new ProductItem(item));
                    
                    this.$emit('update-catalog', this.productList);
                })
                .catch(error => {
                    console.log(error);
                    this.showerror();
                });
        },

        getCartProductList() {
            this.$parent.getJson('/api/cart')
                .then(data => { // data: объект-JSON
                    this.cartList = data.contents.map(item => new ProductInCart(item));
                    
                    this.$emit('update-cart', this.cartList);
                })
                .catch(error => {
                    console.log(error);
                    this.showerror();
                });
        },
    },

    components: {
        'search-form': SearchForm,
        'product-card': ProductCard,
    },

    // Загрузить данные с сервера
    mounted() {
        // Получить список товаров с сервера
        this.getProductList();

        // Получить список товаров с сервера, которые находятся в корзине
        this.getCartProductList();
    },

    //
    template: (
        `<!-- Блок с карточками товаров -->
        <section class="products-section">
            <search-form v-on:filtering="searching"></search-form>
            <div class="container products">
                <!-- Блок для вывода суммарной стоимость всех товаров -->
                <div class="text-center total-cost"></div>
                <div class="product-items">
                    <!-- Здесь динамически добавляются карточки с товаром -->
                    <article v-for="prod of filteredList" :key="prod.id">
                        <product-card v-bind:product="prod" v-on:add="addToCart"></product-card>
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