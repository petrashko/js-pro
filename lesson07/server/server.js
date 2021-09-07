const express = require('express');
const fs = require('fs');

// Обработчик всех запросов корзины
const routerCart = require('./cartRouter');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Открываем файл  в папке public
app.use('/', express.static('public'));

// API для работы с корзиной
app.use('/api/cart', routerCart);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        }
        else {
            res.send(data);
        }
    })
});

app.listen(port, () => console.log(`Listen on port ${port}...`));