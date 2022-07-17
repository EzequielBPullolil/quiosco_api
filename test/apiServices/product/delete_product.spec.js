const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised')
deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(chaiAsPromised);
chai.use(deepEqualInAnyOrder)

const {
    expect,
    assert
} = chai;
const CreateTestProduct = require('test/utils/create_test_product');
//app deps
const DeleteProduct = require('src/apiServices/product/delete_product')
const UnregisteredBarcode = require('src/apiServices/product/exception/unregistered_barcode');

describe('DeleteProduct test', () => {
    let barcodeSuspect; //
    before(async() => {
        /**
         * Creates a product
         **/
        barcodeSuspect = 'aBarcodeForTest'
        await CreateTestProduct({
            barcode: barcodeSuspect,
            name: "aProductName",
            description: "a product description",
            photo: "path/to/product/photo",
            price: 10
        });
    });
    it('basic delete product', async() => {
        /**
         * Creates a product and try delete it using DeleteProduct function
         **/
        return expect(DeleteProduct(barcodeSuspect))
            .to
            .eventually
            .be
            .fulfilled;
    });
    describe('error cases', () => {
        it('try delete unregistered barcode throw error', async() => {
            return expect(DeleteProduct('unregisteredBarcode'))
                .to
                .eventually
                .be
                .rejectedWith(UnregisteredBarcode);
        });
    });
});