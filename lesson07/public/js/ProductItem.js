"use strict"

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
}

/**
 * Класс: элемент в корзине товаров
 */
 class ProductInCart extends ProductItem {
    //constructor(product, imgSrc='https://via.placeholder.com/200x150') {
    constructor(product) {
        super(product);
        // Количество конкретного товара в корзине
        if (product.quantity) {
            this.amount = +product.quantity;
        }
        else {
            this.amount = 1;
        }
    }
}

//*******************************************************************

export {
    ProductItem,
    ProductInCart
}