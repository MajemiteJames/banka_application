import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/server';
import transaction from '../server/datastore/transaction';

chai.use(chaiHttp);
const { expect } = chai;

const API_PREFIX = '/api/v1';

let authToken;
let staffAuthToken;

/**
 * @description Tests for transactions routes
 */
describe('Transaction Route', () => {
  

  
  it('Should not credit an account that does not exist', done => {
    const creditTransaction = {
      creditAmount: 500900.05
    };
    const accountNumber = 7897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/credit`)
      .send(creditTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(404);
        expect(res.body)
          .to.have.property('error')
          .eql('Account does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('Should not credit an account with a negative input', done => {
    const creditTransaction = {
      creditAmount: -500900.05
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/credit`)
      .send(creditTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Credit transaction cannot be less than 1 Naira');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Should not credit an account if an invalid amount is provided', done => {
    const creditTransaction = {
      creditAmount: '5sggy0d'
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/credit`)
      .send(creditTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Transactions can only contain digits');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Shold not credit an account if the input is empty', done => {
    const creditTransaction = {
      creditAmount: ''
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/credit`)
      .send(creditTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Transaction amount cannot be empty');
        expect(res.status).to.equal(400);
        done();
      });
  });


  it('Should not debit an account if an invalid amount is provided', done => {
    const debitTransaction = {
      debitAmount: '5sggy0d'
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/debit`)
      .send(debitTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Transactions can only contain digits');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Shold not debit an account if the input is empty', done => {
    const debitTransaction = {
      debitAmount: ''
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/debit`)
      .send(debitTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Transaction amount cannot be empty');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('Shold not debit an account if the amount is more than the available balance', done => {
    const debitTransaction = {
      debitAmount: 2000000000.99
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/debit`)
      .send(debitTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(409);
        expect(res.body).to.have.property('error');
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('Should not debit an account that does not exist', done => {
    const debitTransaction = {
      debitAmount: 500900.05
    };
    const accountNumber = 7897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/debit`)
      .send(debitTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(404);
        expect(res.body)
          .to.have.property('error')
          .eql('Account does not exist');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('Should not debit an account with a negative input', done => {
    const debitTransaction = {
      debitAmount: -500900.05
    };
    const accountNumber = 8897654324;
    chai
      .request(app)
      .post(`${API_PREFIX}/transactions/${accountNumber}/debit`)
      .send(debitTransaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Debit transaction cannot be less than 1 Naira');
        expect(res.status).to.equal(400);
        done();
      });
  });
});
