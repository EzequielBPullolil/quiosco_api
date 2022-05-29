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
const AlreadyRegisteredBarcode = require('src/apiServices/product/exception/already_registered_barcode')
describe('CreateProduct test', () => {
    before(async () => {
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
        };
        it('create product', () => {
            return expect(CreateProduct(productParams))
                .to
                .eventually
                .be
                .not
                .rejected;
        });
        it('product persisted', async () => {
            const [product] = await sequelize.query(`SELECT * FROM products WHERE barcode='${productParams.barcode}'`, {
                type: QueryTypes.SELECT
            })
            expect(product).to.be.not.undefined;
            expect(product).to.equalInAnyOrder(productParams);
        });
    });
    describe('CreateProduct error clausules', () => {
        describe('missing any CreateProduct param throw error', () => {
            it('missing barcode param ', () => {
                return expect(CreateProduct({
                        name: 'aName',
                        description: 'a product description',
                        photo: 'a/product/photo/path',
                        price: 10
                    }))
                    .to
                    .eventually
                    .be
                    .rejected;
            });
            it('missing name param ', () => {
                expect(CreateProduct({
                        barcode: 'aBarcode',
                        description: 'a product description',
                        photo: 'a/product/photo/path',
                        price: 10
                    }))
                    .to
                    .eventually
                    .be
                    .rejected;
            });
            it('missing description param ', () => {
                expect(CreateProduct({
                        barcode: 'aBarcode',
                        name: 'aName',
                        photo: 'a/product/photo/path',
                        price: 10
                    }))
                    .to
                    .eventually
                    .be
                    .rejected;
            });
            it('missing photo param ', () => {
                expect(CreateProduct({
                        barcode: 'aBarcode',
                        name: 'aName',
                        description: 'a product description',
                        price: 10
                    }))
                    .to
                    .eventually
                    .be
                    .rejected;
            });
            it('missing price param ', () => {
                expect(CreateProduct({
                        barcode: 'aBarcode',
                        name: 'aName',
                        description: 'a product description',
                        photo: 'a/product/photo/path'
                    }))
                    .to
                    .eventually
                    .be
                    .rejected;
            });
        });
        describe('throw error if try sing already used barcode', () => {
            let alreadyUsedBarcode;
            before(async () => {
                alreadyUsedBarcode = "aRegisteredBarcode";
                await CreateProduct({
                    barcode: alreadyUsedBarcode,
                    name: "aProductName",
                    description: "a product description",
                    photo: "path/to/product/photo",
                    price: 10.0
                });
            })
			it('throw error ', () => {
				return expect(CreateProduct({
					barcode: alreadyUsedBarcode,
					name: "otherName",
					description: "a pretty product",
					photo: "path/to/pretty/product",
					price: 10000000.0
				}))
				.to
				.be
				.rejectedWith(AlreadyRegisteredBarcode);
			});
        });
    });
});
