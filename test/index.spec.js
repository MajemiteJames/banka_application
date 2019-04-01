import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';

chai.use(chaiHttp);
const { expect } = chai;

describe('Handle request on incoming routes', () => {
    it('should return the index page', (done) => {
        chai
            .request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done(err);
            });
    });
});