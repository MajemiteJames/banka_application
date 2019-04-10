/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import User from '../server/datastore/users';

import app from '../server/server';

chai.use(chaiHttp);

describe('Testing User Controller', () => {
  describe('Testing signup controller', () => {

    const signupUrl = '/api/v1/auth/signup';

    it(
      'should register a new user when all the parameters are given',
      (done) => {
        chai.request(app)
          .post(signupUrl)
          .send({

            id: User.length + 1,
            firstName: 'James',
            lastName: 'Okoro',
            email: 'test@test.com',
            password: 'password',
            confirmPassword: 'password',
          })

          .end((error, response) => {
            // console.log('error', response);
            expect(response.body).to.be.an('object');
            expect(response).to.have.status(201);
            expect(response.body.status).to.equal(201);
            expect(response.body.data).to.be.a('object');
            expect(response.body).to.be.an('object');
            expect(response.body.data.token).to.be.a('string');
            expect(response.body.message).to.equal('Signup successfully');
            done();
          });
      },
    );

    it('should not register a user when the email is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'michael',
          lastName: 'Umanah',
          username: 'michael123',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Email is required');
          done();
        });
    });

    it('should not register a user when the first name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          lastName: 'Umanah',
          username: 'michael123',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('First name is required');
          done();
        });
    });


    it('should not register a user when the last name is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          firstName: 'Umanah',
          username: 'michael123',
          password: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Last name is required');
          done();
        });
    });

    it('should not register a user when the password is missing', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'mike234@gmail,com',
          firstName: 'Umanah',
          lastName: 'michael123',
          username: 'password',
          confirmPassword: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Password is required');
          done();
        });
    });

    it('should not register a user when the passwords do not match', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'mike23@gmail.com',
          firstName: 'michael',
          lastName: 'Umanah',
          username: 'michael123',
          password: 'password',
          confirmPassword: 'Passwords do not match',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Passwords do not match');
          done();
        });
    });

  });

   /**
   * Test the POST /auth/signin endpoint
   */
  describe('POST /auth/signin', () => {
    it('it should log the user in to the app', (done) => {
      const loginCredential = {
        email: 'okorojames@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loginCredential)
        .end((error, response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            expect(response.body.data).to.be.a('object');
          done();
        });
    });

    
});
});