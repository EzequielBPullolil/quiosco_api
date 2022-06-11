const {productModel} = require('src/services/sequelize/index')
module.exports = async barcode=>{
    const product = await productModel.findByPk(barcode);


    return product;
};