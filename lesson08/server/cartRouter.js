const express = require('express');
const fs = require('fs');

const handlerCart = require('./cartHandler');

const router = express.Router();

const cartFileName = 'server/db/basketData.json';

router.get('/', (req, res) => {
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    //
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            let newCart = handlerCart.addNewProduct(JSON.parse(data), req);
            fs.writeFile(cartFileName, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                }
                else {
                    res.send(JSON.stringify( {result: 1} ));
                }
            })
        }
    });
});


router.put('/:id', (req, res) => {
    //
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            let newCart = handlerCart.changeAmount(JSON.parse(data), req);
            fs.writeFile(cartFileName, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                }
                else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    });
});

router.delete('/product/:id', (req, res) => {
    //
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            let newCart = handlerCart.removeProduct(JSON.parse(data), req);
            fs.writeFile(cartFileName, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                }
                else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    });
});

router.delete('/clear', (req, res) => {
    //
    fs.readFile(cartFileName, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            let newCart = handlerCart.removeAll(JSON.parse(data));
            fs.writeFile(cartFileName, newCart, (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                }
                else {
                    res.send(JSON.stringify( {result: 1} ));
                }
            })
        }
    });
});

//*******************************************************************

module.exports = router;