//Test deps and sets
const chai = require('chai'),
    chaiHttp = require('chai-http')
chai.use(chaiHttp);

const {
    expect,
    assert,
    request
} = chai;

const CreateTestProduct = require('test/utils/create_test_product')
//Api domain imports
const app = require('src/app');

describe('ProductRouter barcode route test', () => {
    let productTestSuject;
    before(async() => {
        productTestSuject = {
            barcode:'ProductBarcodeRouterTestProduct',
            name:'a name for test',
            price:1000,
            description:'a product description',
            photo:'/path/to/photo'
        }
        await CreateTestProduct(productTestSuject)
    });
    it('barcode get', (done) => {
        request(app)
            .get(`/products/barcode/${productTestSuject.barcode}`)
            .end((err, res) => {
                if (err) done(err)
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.deep.equal(productTestSuject)
                done()
            })
    });
    it('barcode delete', (done) => {
        request(app)
            .delete(`/products/barcode/${productTestSuject.barcode}`)
            .end((err, res) => {
                if (err) done(err);

                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.deep.equal({
                    status:'product deleted'
                });
                done();
            })
    });
});