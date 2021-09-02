"use strict"

import { Catalog } from './Catalog.js';
import { Cart } from './Cart.js';

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
        }
    },

    computed: {
        /*
        totalAmount() {
            console.log('totalAmount()');
            const result = this.cartProductList.reduce((total, item, index, srcList) => {
                return total + item.amount;
            }, 0);
    
            return result;
        }
        */
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
        setCatalogList() {
            this.catalogProductList = window.myGlobal.catalogList;
        },

        //
        setCartList() {
            //console.log('setCartList()');
            this.cartProductList = window.myGlobal.cartList;

            this.totalAmount = this.cartProductList.reduce((total, item, index, srcList) => {
                return total + item.amount;
            }, 0);
        },
    },

    components: {
        'catalog': Catalog,
        'cart': Cart
    },
});

//*******************************************************************

export {
    vueApp
}