
import Transactions from '../datastore/transaction';
import dummyData from '../datastore/users';
import { isEmpty } from '../middlewares/validateSignUp'

const { users } = dummyData;
const { transactions, accounts } = Transactions;
export default class TransactionController {
    /**
     * @description Credit an account
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @route POST /api/v1/transactions/<account-number>/credit
     * @returns {Object} status code, data and message properties
     * @access private Admin or staff only
     */
    static creditAccount(req, res) {
      const { accountNumber } = req.params;
      const { creditAmount } = req.body;
    /*  if (users.type !== 'staff') {
        return res.status(401).json({
          status: 401,
          error: 'You are not authorized to carry out that action'
        });
      }*/
      const accountToCredit = accounts.find(
        account => account.accountNumber === parseInt(accountNumber, 10)
      );
  
      if (isEmpty(accountToCredit)) {
        return res.status(404).json({
          status: 404,
          error: 'Account does not exist'
        });
      }
  
      const { balance } = accountToCredit;
      const accountOwner = users.find(user => user.id);
      const transactionsLastID = transactions[transactions.length - 1].id;
      const newID = transactionsLastID + 1;
      const transaction = {
        transactionId: newID,
        oldBalance: balance,
        newBalance: balance + parseFloat(creditAmount),
        accountNumber: req.body.accountNumber,
        amount:parseFloat(creditAmount),
        transactionType : 'client',
        createdAt:new Date()
      }
  
      // update the balance of the old account
      accountToCredit.balance = transaction.newBalance;
  
      transactions.push(transaction);

      const data = {
        transactionId: transaction.id,
        accountNumber,
        amount: transaction.amount,
        transactionType: transaction.type,
        accountBalance: accountToCredit.balance
      };
      return res.status(201).json({
        status: 201,
        data,
        message: 'Account credited successfully'
      });
    }
  
    /**
     * @description Credit an account
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @route POST /api/v1/transactions/<account-number>/credit
     * @returns {Object} status code, data and message properties
     * @access private Admin or staff only
     */
    static debitAccount(req, res) {
      const { accountNumber } = req.params;
      const { debitAmount } = req.body;
     /* if (req.decoded.type !== 'staff') {
        return res.status(401).json({
          status: 401,
          error: 'You are not authorized to carry out that action'
        });
      }*/
      const accountToDebit = accounts.find(
        account => account.accountNumber === parseInt(accountNumber, 10)
      );
  
      if (isEmpty(accountToDebit)) {
        return res.status(404).json({
          status: 404,
          error: 'Account does not exist'
        });
      }
  
      const { balance, owner } = accountToDebit;
  
      if (debitAmount > balance) {
        return res.status(409).json({
          status: 409,
          error: `Insufficient funds, your account balance is ${balance}`
        });
      }
  
      const accountOwner = users.find(user => user.id === owner);
      const transactionsLastID = transactions[transactions.length - 1].id;
      const newID = transactionsLastID + 1;
      const transaction = {
        transactionId: newID,
        oldBalance: balance,
        newBalance: balance + parseFloat(debitAmount),
        accountNumber: req.body.accountNumber,
        amount: parseFloat(debitAmount),
        transactionType : 'debit',
        createdAt:new Date()
      }
  
  
      // update the balance of the old account
      accountToDebit.balance = transaction.newBalance;
  
      transactions.push(transaction);
  
      const data = {
        transactionId: transaction.id,
        accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: accountToDebit.balance
      };
      return res.status(201).json({
        status: 201,
        data,
        message: 'Account debited successfully'
      });
    }
  }