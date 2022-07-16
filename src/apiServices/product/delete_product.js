const { productModel } = require('src/services/sequelize/index')
const UnregisteredBarcode = require('src/apiServices/product/exception/unregistered_barcode')

module.exports = async (barcode) => {
    /**
     * Finds a product by barcode and REMOVE it from
     * database 
     * 
     * in case of unregistered barcode throw error
     * @param barcode [string]
     * @error UnregisteredBarcode
     **/

    if (typeof (barcode) != 'string') throw new Error;
    const isProductRegistered = await productModel.findByPk(barcode);
    if (!isProductRegistered) throw new UnregisteredBarcode;


    await productModel.destroy({
        where: {
            barcode
        }
    });
}