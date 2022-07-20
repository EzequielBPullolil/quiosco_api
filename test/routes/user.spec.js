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

                expect(res).to.have.status(200);
                done();
            })
    });

    it('UserRouter post test', (done) => {
        /**
         * Request /users post endpoint and 
         * verify response
         */
        const userParams = {
            name:'AuserName',
            password:'ApasswordForUser',
            rol: 0
        }
        request(app)
            .post('/users')
            .send(userParams)
            .end((err,res)=>{
                if(err) done(err);

                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body.status).to.be.equal('User registered')
                expect(res.body.user.name).to.be.equal(userParams.name)
                expect(res.body.user.password).to.be.not.equal(userParams.password)

                done();
            })
    });
});