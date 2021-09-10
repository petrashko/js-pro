
// cart: JSON-объект считанный из файла "server/db/basketData.json"
let addNewProduct = (cart, req) => {
    cart.contents.push(req.body);

    return JSON.stringify(cart, null, 4);
};

// cart: JSON-объект считанный из файла "server/db/basketData.json"
let removeProduct = (cart, req) => {
    let find = cart.contents.find(item => item.id_product === +req.params.id);

    cart.contents.splice(cart.contents.indexOf(find), 1);

    return JSON.stringify(cart, null, 4);
};

// cart: JSON-объект считанный из файла "server/db/basketData.json"
let changeAmount = (cart, req) => {
    let find = cart.contents.find(item => item.id_product === +req.params.id);

    find.quantity += req.body.amount;
    
    return JSON.stringify(cart, null, 4);
};

// cart: JSON-объект считанный из файла "server/db/basketData.json"
let removeAll = (cart) => {
    cart.contents.splice(0, cart.contents.length);

    return JSON.stringify(cart, null, 4);
};

//*******************************************************************

module.exports = {
    addNewProduct,
    removeProduct,
    changeAmount,
    removeAll,
};