const {productModel} = require('src/services/sequelize/index')
module.exports = async({barcode, name, price, description, photo})=>{
	/**
		* Inserts one product in database using the product fields
		* if not exist other product registered used @barcode
		* param and name,description and photo are valid
		* product fields

		@param barcode STRING
		@param name STRING
		@param description STRING
		@param photo STRING
		@param price INTEGER

		@return object
	**/
	if(barcode === undefined) throw new Error();
	if(name === undefined) throw new Error();
	if(description === undefined) throw new Error();
	if(photo === undefined) throw new Error();
	if(price === undefined) throw new Error();

	const product = await productModel.create({
		barcode,
		name,
		description,
		photo,
		price
	});
	return product.dataValues;
}
