"use strict";

import { Catalog } from './Catalog.js';
import { Cart } from './Cart.js';
import { ErrorServer } from './ErrorServer.js';

const vueApp = Vue.createApp({
    //
    data() {
        return {
            catalogProductList: [],
            cartProductList: [],
            //
            showCart: false,
            //
            totalAmount: 0,
            //
            showErrorServer: false,
        }
    },

    methods: {
        //
        renderCart($event) {
            $event.preventDefault();
            this.showCart = true;
        },

        //
        renderCatalog($event) {
            $event.preventDefault();
            this.showCart = false;
        },

        //
        openModal() {
            this.showErrorServer = true;
        },

        //
        closeModal($event) {
            $event.preventDefault();
            this.showErrorServer = false;
        },

        //
        setCatalogList(catalogList) {
            //this.catalogProductList = window.myGlobal.catalogList;
            this.catalogProductList = catalogList;
        },

        //
        setCartList(cartList) {
            //console.log('setCartList()');
            //this.cartProductList = window.myGlobal.cartList;
            this.cartProductList = cartList;

            this.totalAmount = this.cartProductList.reduce((total, item, index, srcList) => {
                return total + item.amount;
            }, 0);
        },

        /**
         * Метод для получения списка товаров с сервера
         */
        getJson(url) {
            //const promise = fetch(`${API}/catalogData.json`)
            // Получаем данные с сервера
            const promise = fetch(url, {
                method: 'GET',
            })
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    return response.json();
                }
                else {
                    console.log(`${response.statusText}: ${response.status} error`);
                    this.showerror();
                }
            })
            .catch(error => {
                console.log(error);
                this.showerror();
            });
            
            return promise;
        },

        /**
         * Метод отправляет POST-запросы на сервер
         */
        postJson(url, data) {
            // Отправить POST-запрос
            const promise = fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    return response.json();
                }
                else {
                    console.log(`${response.statusText}: ${response.status} error`);
                    this.showerror();
                }
            })
            .catch(error => {
                console.log(error);
                this.showerror();
            });
            
            return promise;
        },

        /**
         * Метод отправляет PUT-запросы на сервер
         */
        putJson(url, data) {
            // Отправить PUT-запрос
            const promise = fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status >= 200 && response.status < 400) {
                    return response.json();
                }
                else {
                    console.log(`${response.statusText}: ${response.status} error`);
                    this.showerror();
                }
            })
            .catch(error => {
                console.log(error);
                this.showerror();
            });
            
            return promise;
        },
    },

    components: {
        'catalog': Catalog,
        'cart': Cart,
        'error-server': ErrorServer,
    },
});

//*******************************************************************

export {
    vueApp
}