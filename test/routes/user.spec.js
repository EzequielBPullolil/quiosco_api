const chai = require('chai'),
    chaiHttp = require('chai-http')
chai.use(chaiHttp);

const {
    expect,
    assert,
    request
} = chai;

const app = require('src/app')

describe('UserRouter test', () => {
    it('UserRouter up', (done) => {
        request(app)
            .get('/users')
            .end((err,res)=>{
                if(err) done (err);

                expect(res).to.have.status(200)
                done();
            })
    });
});