const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised')
deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(chaiAsPromised);
chai.use(deepEqualInAnyOrder)

const {
    expect,
    assert
} = chai;

//test domain
const CreateTestProduct = require('test/utils/create_test_product')
//app domain
const UnregisteredBarcode = require('src/apiServices/product/exception/unregistered_barcode');
const UpdateProduct = require('src/apiServices/product/update_product');
describe('UpdateProduct test', (done) => {
    let productSujectFieds;
    before(async() => {
        productSujectFieds = {
            barcode:'aBarcodeForProductUpdateTest',
            name:'a name',
            price:111,
            description:'a description',
            photo:'path/to/photo'

        }
        await CreateTestProduct(productSujectFieds);
    });
    it('update product name', async() => {
        const newName = 'name';
        return expect( UpdateProduct(productSujectFieds.barcode, {name:newName}) )
            .to
            .eventually
            .have
            .property('name').equal(newName)
    });
});