const express = require('express');
const fs = require('fs');

const handlerCart = require('./cartHandler');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/basketData.json', 'utf-8', (err, data) => {
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
    fs.readFile('server/db/basketData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            let newCart = handlerCart.addNewProduct(JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
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
    fs.readFile('server/db/basketData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            let newCart = handlerCart.changeAmount(JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
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

//*******************************************************************

module.exports = router;