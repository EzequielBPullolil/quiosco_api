const express = require('express');
const app = express();

//Domain
const productRouter = require('src/routes/product_route');

app.use('/products', productRouter);
app.get('/', (req, res) => {
    return res.sendStatus(200)
})

module.exports = app;
