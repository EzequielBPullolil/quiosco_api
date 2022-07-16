const express = require('express');
const productRouter = express.Router();
const CreateProduct = require('src/apiServices/product/create_product')
const FindProduct = require('src/apiServices/product/find_product')
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
			console.log(err);
			return res.status(400).json(err)
		}
	});

productRouter.route('/barcode/:barcode')
	.get(async (req, res) => {
		const product = await FindProduct(req.params.barcode)
		return res.status(200).json(product)
	})
	.delete(async (req, res) => {
		return res.status(200).json({
			status:'product deleted'
		})
	})
module.exports = productRouter;
