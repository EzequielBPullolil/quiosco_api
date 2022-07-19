const { productModel } = require('src/services/sequelize/index')
const UnregisteredBarcode = require('src/apiServices/product/exception/unregistered_barcode')

module.exports = async (barcode, productFields) => {
    /**
     * Update one product finded for barcode 
     * 
     * @param barcode STRING
     * @param productFieds object
     * @error UnregisteredBarcode 
     * @return PRODUCT
     */
    const fiteredFields = {};
    for (const key in productFields) {
        if(productFields[key] === undefined) continue;
        
        fiteredFields[key] = productFields[key];
    }
    const product = await productModel.findByPk(barcode);
    product.set(fiteredFields);

    await product.save()
    
    return product.dataValues 
    
}