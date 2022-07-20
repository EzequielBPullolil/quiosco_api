const express = require('express');
const app = express();

app.use(express.json());
//Domain
const productRouter = require('src/routes/product_route');
const userRouter = require('src/routes/user_route');

app.use('/products', productRouter);
app.use('/users', userRouter);
app.get('/', (req, res) => {
    return res.sendStatus(200)
})

module.exports = app;
