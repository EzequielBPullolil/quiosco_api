const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised')
deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(chaiAsPromised);
chai.use(deepEqualInAnyOrder)

const {
    expect,
    assert
} = chai;
const {
    sequelize
} = require('src/services/sequelize/index');
const { QueryTypes } = require('sequelize');
const UnregisteredBarcode = require('src/apiServices/product/exception/unregistered_barcode');
const FindProduct = require('src/apiServices/product/find_product');

describe('FindProduct test', () => {
    let barcode;
    before(async () => {
        /**
         * Create a suject product
         */
        barcode = 'aBarcodeForTest'
        await sequelize.query(
            `INSERT INTO products(barcode)
            VALUES('${barcode}')`
            , { type: QueryTypes.INSERT });
    });
    it('Basic find product test', async () => {
        /**
         * Test basic find product
         */
        const product = await FindProduct(barcode);

        expect(product).to.have.property('barcode');
        expect(product.barcode).to.be.equal(barcode)
    });
    it('Find unregistered barcode throw error', async () => {
        return expect(FindProduct('unregisteredBarcode'))
            .to
            .eventually
            .be
            .rejectedWith(UnregisteredBarcode);
    });
});