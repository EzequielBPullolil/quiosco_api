const { productModel } = require('src/services/sequelize/index');
const UnregisteredBarcode = require('src/apiServices/product/exception/unregistered_barcode')
module.exports = async barcode => {
    /**
     * Search for a product by barcode and return it
     * @param barcode [STRING]
     * @return product [object]
     */
    const product = await productModel.findByPk(barcode);

    if (product === null) {
        throw new UnregisteredBarcode();
    }

    return product.dataValues;
};