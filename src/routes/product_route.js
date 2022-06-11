const express = require('express');
const productRouter = express.Router();
const CreateProduct = require('src/apiServices/product/create_product')
productRouter.route('/')
	.get((req,res)=>{
		return res.sendStatus(200)
	})
	.post(async (req,res)=>{
		try{
			const product = await CreateProduct(req.body);
			return res.status(201).json({
				status:'product created'
			});
		}catch(err){
			console.log(err);
			return res.status(400).json(err)
		}
	})

module.exports = productRouter;
