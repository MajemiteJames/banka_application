import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import account from '../server/datastore/account'


chai.use(chaiHttp);
const { expect } = chai;

describe('Current Account list Intergration Test', () => {

  const Account = {
    id: account.length + 1,
    accountNumber: parseInt(Math.random()*10000000000, 10),
    firstName: 'john',
    lastName: 'matthew',
    email: 'johnmatthew@getMaxListeners.com',
    type: 'current',
    openingBalance: 45.000,
  }


  it('create Account successfully', (done) => {
    chai
    .request(app)
    .post('/api/v1/accounts')
    .send(Account)
    .end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal('true');
      expect(res.type).to.equal('application/json');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Account created successfully');
      expect(res).to.have.status(201);
      done(err);
        });
    
      });

  it('should throw an error if any field is not provided', (done) => {
    const Account = {
      firstName: '',
      lastName: 'matthew',
      email: 'johnmatthew@getMaxListeners.com',
      type: 'savings',
      openingBalance: 45.000,
    }
      chai.request(app)
        .post('/api/v1/accounts')
        .send(Account)
        .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('firstName is required');
        done();
        });
      });

  it('should throw an error if any field is not provided', (done) => {
    const Account = {
      firstName: 'john',
      lastName: '',
      email: 'johnmatthew@getMaxListeners.com',
      type: 'savings',
      openingBalance: 45.000,
    }
      chai.request(app)
        .post('/api/v1/accounts')
        .send(Account)
        .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('lastName is required');
        done();
          });
      });
  
  

  it('should throw an error if any field is not provided', (done) => {
      const Account = {
        firstName: 'john',
        lastName: 'matthew',
        email: '',
        type: 'savings',
        openingBalance: 45.000,
      }
      chai.request(app)
        .post('/api/v1/accounts')
        .send(Account)
        .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('email is required');
        done();
          });
      });

  it('should throw an error if any field is not provided', (done) => {
    const Account = {
      firstName: 'john',
      lastName: 'matthew',
      email: 'johnmatthew@getMaxListeners.com',
      type: '',
      openingBalance: 45.000,
    }
    chai.request(app)
      .post('/api/v1/accounts')
      .send(Account)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal('false');
        expect(res.type).to.equal('application/json');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('The type of Account is required');
        done();
          });
    });

  describe('get all Current Account', function(){
    it('should get all Current Account', (done) => {
      chai.request(app)
        .get('/api/v1/accounts')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.equal('true');
          expect(res.body.status).to.equal(200);
          expect(res.body.accounts).to.be.an('array');
          expect(res.body.accounts.length).to.not.equal(0);
          expect(res.body.accounts).to.be.an('array');
          done();
            });
          });
        });

    it('should retrieve the specific Account with given ID', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts/2578433446')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.Account).to.be.an('object');
          expect(res.body.message).to.equal('Current Accounts retrieved successfully');
          expect(res.type).to.equal('application/json');
          //console.log(Account);
          done(err);
          });
        });

    it('should return an error if Account ID does not exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts/25784334460')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(404);
          expect(res.body.message).to.equal('Current Account does not exist');
          done(err);
        });
      });

  describe('update a Current Account', () => {
    it('should return an error if accountNumber is not inserted', (done) => {
      chai
        .request(app)
        .patch('/api/v1/accounts/2578433446')
        .send({
          accountNumber: '',
          status: 'active',
          openingBalance: 34.900,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.type).to.equal('application/json');
          //expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('accountNumber is required');
          done(err);
          });
      });
      it('should return an error if status is not inserted', (done) => {
        chai
          .request(app)
          .patch('/api/v1/accounts/2578433446')
          .send({
            accountNumber: '2578433446',
            status: '',
            openingBalance: 34.900,
          })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.type).to.equal('application/json');
            //expect(res.body).to.have.property('status');
            expect(res.body.status).to.equal(400);
            expect(res.body.message).to.equal('status is required');
            done(err);
            });
        });
    it('update a Savings Account', (done) => {
      chai.request(app)
        .patch('/api/v1/accounts/2578433446')
        .send({
          accountNumber: '2578433446',
          status: 'active',
          openingBalance: 34.900,
        })
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Status of Acccount updated successfully');
            //console.log(res.body);
            done(err);
        });
      });

  });

    it('Delete a Current Account not found', (done) => {
      chai.request(app)
        .delete('/api/v1/accounts/38729846380')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Account not found');
          done(err);
        });
    });
                              


                              
                            
                            

      
    


});