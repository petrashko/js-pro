"use strict"

class Hamburger {
    constructor(formName, size='big', ingredient='cheese') {
        this.size = size;
        this.ingredient = ingredient;
        this.flavoring = false;
        this.mayo = true;
        this.cost = 0;
        this.calories = 0;

        this.form = document.forms[formName];
        //this.form.addEventListener('submit', (ev) => this.handlerSubmit(ev));

        for (let i = 0; i < this.form.size.length; i++) {
            this.form.size[i].addEventListener("click", (ev) => {
                //ev.preventDefault();
                this.setSize(ev.target.value);
            });
        }
        
        this.form.ingredient.addEventListener("change", (ev) => {
            //ev.preventDefault();
            this.setIngredient(ev.target.value);
        });
        
        this.form.flavoring.addEventListener('click', (ev) => {
            //ev.preventDefault();
            this.setFlavoring(ev.target.checked);
        });
        
        this.form.mayo.addEventListener('click', (ev) => {
            //ev.preventDefault();
            this.setMayo(ev.target.checked);
        });
    }

    setSize(size) {
        this.size = size;
        this.calculateOrderInfo();
    }

    setIngredient(ingredient) {
        this.ingredient = ingredient;
        this.calculateOrderInfo();
    }

    setFlavoring(flavoring) {
        this.flavoring = flavoring;
        this.calculateOrderInfo();
    }

    setMayo(mayo) {
        this.mayo = mayo;
        this.calculateOrderInfo();
    }

    calculateOrderInfo() {
        this.cost = 0;
        this.calories = 0;

        // Большой (100 рублей, 40 калорий)
        if ('big' === this.size) {
            this.cost += 100;
            this.calories += 40;
        }
        // Маленький (50 рублей, 20 калорий)
        else {
            this.cost += 50;
            this.calories += 20;
        }

        switch (this.ingredient) {
            // С салатом (+20 рублей, +5 калорий)
            case 'salad':
                this.cost += 20;
                this.calories += 5;
                break;
            // С картофелем (+15 рублей, +10 калорий)
            case 'potato':
                this.cost += 15;
                this.calories += 10;
                break;
            // С сыром (+10 рублей, +20 калорий)
            default:
                this.cost += 10;
                this.calories += 20;
                break;
        }
        
        // Посыпать приправой (+15 рублей, +0 калорий)
        if (true === this.flavoring) {
            this.cost += 15;
            this.calories += 0;
        }
        // Полить майонезом (+20 рублей, +5 калорий)
        if (true === this.mayo) {
            this.cost += 20;
            this.calories += 5;
        }

        this.renterOrderInfo();
    }

    renterOrderInfo() {
        const divOrderInfo = document.querySelector('.orderInfo');
        divOrderInfo.textContent = `Стоимость вашего гамбургера ${this.cost} руб. калорийность: ${this.calories}`;
    }

    handlerSubmit(ev) {
        ev.preventDefault();
        console.log('Обработать заказ');
        
        this.setSize(this.form.size.value);
        this.setIngredient(this.form.ingredient.value);
        this.setFlavoring(this.form.flavoring.checked);
        this.setMayo(this.form.mayo.checked);

        this.calculateOrderInfo();
    }
}

//*******************************************************************
export {
    Hamburger
};
