//Test deps and sets
const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised')
	deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(chaiAsPromised);
chai.use(deepEqualInAnyOrder)
const {
    expect,
    assert
} = chai;
//app imports
const {
    QueryTypes
} = require('sequelize');
const {
    sequelize
} = require('src/services/sequelize/index');

//Domain imports
const CreateProduct = require('src/apiServices/product/create_product');
describe('CreateProduct test', () => {
	before(async()=>{
		await sequelize.query('DELETE FROM products');
	})
    describe('basic product create', () => {
        /**
         * exceute CreateProduct function and
         * verify if they dont throw error and
         * if product with same barcode are persisted
         **/
        const productParams = {
            barcode: "aBarcode",
            name: "aProductName",
            description: "a product description",
            photo: "path/to/product/photo",
			price: 10
        }
        it('create product', () => {
            expect(CreateProduct(productParams))
                .to
                .eventually
                .be
                .not
                .rejected;
        });
        it('product persisted', async() => {
			const [product] = await sequelize.query(`SELECT * FROM products WHERE barcode='${productParams.barcode}'`, {
				type: QueryTypes.SELECT
			})
			expect(product).to.be.not.undefined;
			expect(product).to.equalInAnyOrder(productParams);
        });
    });
});
