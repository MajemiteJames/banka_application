import moment from 'moment';
import db from '../db/index';
import Model from '../db/model';
import Helper from '../helpers/helper';
import User from '../dbController/userController'
import "@babel/polyfill";

const AccountController = {

  /**
   * Create An Account
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {

    if(!req.body.firstName) {
      return res.status(400).send({
        success: 'false',
        message: 'firstName is required'
      });
    } else if(!req.body.lastName) {
      return res.status(400).send({
        success: 'false',
        message: 'lastName is required'
      });
    } else if(!req.body.ownerEmail) {
      return res.status(400).send({
        success: 'false',
        message: 'email is required'
      });
    } else if(!req.body.type) {
      return res.status(400).send({
        success: 'false',
        message: 'The type of Account is required'
      });
    } 
    
    const text = `INSERT INTO
      accounts(accountNumber, ownerEmail, type, status, balance)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
  
    const values = [
      parseInt(Math.random()*10000000000, 10),
      req.body.email,
      req.body.type,
      'Draft',
      0.00,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        data: [{
          id: rows[0].id,
          accountNumber: rows[0].accountnumber,
          ownerEmail: rows[0].owneremail,
          type: rows[0].type,
         status: rows[0].status,
         balance: rows[0].balance,
        }],
        message: 'Account created successfully'
      });
    } catch(error) {
      return res.status(400).send({
        status: 400,
        error: error.message
      });
    }
  },
  /**
   * Get All Accounts
   * @param {object} req 
   * @param {object} res 
   * @returns {object} get all Accounts
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM accounts';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ 
        status: 201,
        data:[{
          rows, 
          success: 'true',
          message: 'Account retrieved successfully',
          rowCount 
        }],

      
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  async getByEmail(req, res) {
    // const text = `SELECT * FROM accounts INNER JOIN newuser ON newuser.email = accounts.owneremail WHERE owneremail = $1 VALUES(${req.params.email})`
    const select = {
      query: values => ({
        text: "SELECT * FROM accounts INNER JOIN newuser ON newuser.email = accounts.owneremail WHERE owneremail = $1",
        values,
      })
    }
                 
          try {
            const { rows, rowCount } = await db.query(select.query([req.params.email]));
            console.log(req.params.email);
            console.log(rows);
            return res.status(200).json({rows, rowCount})
          } catch(error) {
            console.log(error)
            return res.status(400).send(error);
          }   
  },



     /**
   * Get An Account
   * @param {object} req 
   * @param {object} res
   * @returns {object} Account object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM accounts WHERE accountNumber = $1';
    try {
      const { rows } = await db.query(text, [req.params.accountNumber]);
      console.log(rows);
      if (!rows[0]) {
        return res.status(404).send({'message': 'Account not found'});
      }
      return res.status(200).send(
        rows[0],
      );
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  async update(req, res) {
    if (!req.body.accountNumber) {
      return res.status(400).send({
        status: 400,
        success: 'false',
        message: 'accountNumber is required',
      });
    } else if (!req.body.status) {
      return res.status(400).send({
        status: 400,
        success: 'false',
        message: 'status is required',
      });
    } 
    const findOneQuery = 'SELECT * FROM accounts WHERE accountNumber=$1';
    const updateOneQuery =`UPDATE accounts
      SET status=$1 returning *`;
    
    try {
      const { rows } = await db.query(findOneQuery, [req.params.accountNumber]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Account not found'});
      }
      const values = [
        req.body.status || rows[0].status,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },

  /**
   * Delete An Account
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM accounts WHERE accountNumber=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.accountNumber]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Account not found'});
      }} catch(error) {
      return res.status(400).send(error);
    } 
    return res.status(204).send({ 'message': 'deleted' });
  }
     
    

}
  
  
  export default AccountController;