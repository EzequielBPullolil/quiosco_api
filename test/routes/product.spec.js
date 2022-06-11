//Test deps and sets
const chai = require('chai'),
    chaiHttp = require('chai-http')
chai.use(chaiHttp);

const {
    expect,
    assert,
    request
} = chai;
//Api domain imports
const app = require('src/app')
describe('Products route test', () => {
	const productTestSuject = {
        barcode:'aTestBarcodeForRoute',
        name:"aaaa",
        price:13,
        description:"aaaa",
        photo:"aaaa"
    };
	it('post', (done) => {
		request(app)
			.post('/products')
			.send(productTestSuject)
			.end((err,res)=>{
				if(err) done(err);
				expect(res).to.have.status(201)
				expect(res.body).to.be.deep.equal({
					status: 'product created'
				})
				done();
			})
	});
    it('product status', (done) => {
        request(app)
            .get('/products')
            .end((err, res) => {
                if (err) done(err)
                expect(res).to.have.status(200);
                done()
            })
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
});
