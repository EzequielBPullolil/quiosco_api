const {productModel} = require('src/services/sequelize/index')
module.exports = async(barcode)=>{
    /**
     * Finds a product by barcode and REMOVE it from
     * database 
     * 
     * @param barcode [string]
     **/

    if(typeof(barcode) != 'string') throw new Error;
    
    await productModel.destroy({
        where:{
            barcode
        }
    });
}