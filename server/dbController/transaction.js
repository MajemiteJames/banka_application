import db from '../db/model';
import "@babel/polyfill";
import moment from 'moment';

class TransactionController {

  static fetchAll(request, response) {


    const query = 'SELECT * FROM transactions';
    return db.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          response.status(400).send({ status: 400, error: 'There are no transactions records' });
        }
        return response.status(200).send({ status: 200, message: 'Transactions successfully retrieved', data: result.rows });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching all transactions, ensure you provide valid credentials' });
      });
  }

  /**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  static fetchSpecificTransaction(request, response) {
    const { id } = request.params;
    const query = `SELECT * FROM transactions WHERE "transactionid"=${id}`;
    return db.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).send({ status: 400, error: 'Transaction does not exist' });
        }
        return response.status(200).send({ status: 200, message: 'Transaction successfully retrieved', data: result.rows[0] });
      })
      .catch((error) => {
        response.status(500).send({ status: 500, error: 'Error fetching the specific transaction, ensure you provide valid credentials' });
      });
  }

        /**
   * Create Transaction
   * @param {object} req 
   * @param {object} res
   * @returns {object} transaction object 
   */
  static creditAccount(request, response) {

    const { accountNumber } = request.params;
    const { creditAmount } = request.body;

    const findSpecificAccount = `SELECT * FROM accounts WHERE "accountnumber"='${(accountNumber)}'`;
    return db.query(findSpecificAccount)  
    .then((result) => {
      if (result.rowCount === 0) {
        return response.status(400).send({ status: 400, error: 'Account does not exist' });
      }
      const { accountnumber, balance } = result.rows[0];
      const newBalance = parseFloat(balance) + parseFloat(creditAmount);
      const creditDetails = {
        type: 'credit',
        accountnumber,
        creditAmount,
        oldBalance: balance,
        balance: newBalance,
        createdAt: new Date().toLocaleString()
      };

      const creditQuery = `INSERT INTO transactions ("type", "accountnumber", "amount", "oldbalance", "newbalance", "createdat")
       VALUES('${creditDetails.type}', '${creditDetails.accountnumber}', '${creditDetails.creditAmount}',  '${balance}',   
       '${newBalance}', '${creditDetails.createdAt}') returning *`;
      console.log(creditQuery);
      const updateCreditedAccount = `UPDATE accounts SET "balance"='${newBalance}' WHERE "accountnumber"='${accountNumber}' returning *`;
      return db.query(updateCreditedAccount)
        .then(result => db.query(creditQuery)
          .then((result) => {
            console.log(result);
            if (result.rowCount >= 1) {
              return response.status(200).send({ status: 202, message: 'Acccount successfully credited', data: result.rows[0] });
            }
            return response.status(500).send({ staus: 500, message: 'Error crediting the specific account, ensure you provide valid credentials' });
          }))
          
       // .catch((error) => {
       //   response.status(500).send({ status: 500, error: 'Error crediting the account, ensure you provide valid credentials' });
       // });
    });
  }

  
  static debitAccount(request, response) {
    const { accountNumber } = request.params;
    const { debitAmount } = request.body;


    const findSpecificAccount = `SELECT * FROM accounts WHERE "accountnumber"='${(accountNumber)}'`;
    return db.query(findSpecificAccount)
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).send({ status: 400, error: 'Account does not exist' });
        }
        const { accountnumber,balance } = result.rows[0];
        const newBalance = parseFloat(balance) - parseFloat(debitAmount);

        if (balance < debitAmount) {
          return response.status(400).send({ status: 400, error: 'Insufficient fund' });
        }

        const debitDetails = {
          type: 'debit',
          accountnumber,
          debitAmount,
          oldBalance: balance,
          balance: newBalance,
          createdAt: new Date().toLocaleString()
        };

        const debitQuery = `INSERT INTO transactions ("type", "accountnumber", "amount", "oldbalance", "newbalance", "createdat")
         VALUES('${debitDetails.type}', '${debitDetails.accountnumber}', '${debitDetails.debitAmount}',  '${balance}',   
         '${newBalance}', '${debitDetails.createdAt}') returning *`;
        console.log(debitQuery);
        const updateDebitedAccount = `UPDATE accounts SET "balance"='${newBalance}' WHERE "accountnumber"='${accountNumber}' returning *`;
        return db.query(updateDebitedAccount)
          .then(result => db.query(debitQuery)
            .then((result) => {
              if (result.rowCount >= 1) {
                console.log(result.rowCount);
                return response.status(200).send({ status: 202, message: 'Acccount successfully debited', data: result.rows[0] });
              }
              return response.status(500).send({ staus: 500, message: 'Error debiting the specific account' });
            }))
          .catch((error) => {
            response.status(500).send({ status: 500, error: 'Error debiting the account, ensure you provide valid credentials' });
          });
      });
  }



}



export default TransactionController;