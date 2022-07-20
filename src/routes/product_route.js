const express = require('express');
const productRouter = express.Router();
const CreateProduct = require('src/apiServices/product/create_product')
const FindProduct = require('src/apiServices/product/find_product')
const DeleteProduct = require('src/apiServices/product/delete_product')
const UpdateProduct = require('src/apiServices/product/update_product')

productRouter.route('/')
	.get((req, res) => {
		return res.sendStatus(200)
	})
	.post(async (req, res) => {
		try {
			const product = await CreateProduct(req.body);
			return res.status(201).json({
				status: 'product created'
			});
		} catch (err) {
			return res.status(400).json({
				status:'product not created',
				error: err
			})
		}
	});

productRouter.route('/barcode/:barcode')
	.get(async (req, res) => {
		try{
			const product = await FindProduct(req.params.barcode)
			return res.status(200).json(product)
		}catch(err){
			return res.status(400).json({
				status:'product not finded',
				error: err
			})
		}
	})
	.delete(async (req, res) => {
		try{
			await DeleteProduct(req.params.barcode);
			return res.status(200).json({
				status:'product deleted'
			})
		}catch(err){
			return res.status(400).json({
				status:'product not deleted',
				error: err
			})
		}
	})
	.put(async(req,res)=>{
		try{
			const barcode = req.params.barcode;
			const product = await UpdateProduct(barcode, req.body);
			return res.status(200).json({
				status:'product updated',
				product
			})
		}catch(err){
			return res.status(400).json({
				status:'product not updated',
				error: err
			})
		}
	})
module.exports = productRouter;
