const express = require('express');
const productRouter = express.Router();
const ProductCreator = require('src/apiServices/product/create_product')
productRouter.route('/')
	.get((req,res)=>{
		return res.sendStatus(200)
	})
	.post(async (req,res)=>{
		return res.sendStatus(201)
	})

module.exports = productRouter;
