"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transaction = _interopRequireDefault(require("../datastore/transaction"));

var _users = _interopRequireDefault(require("../datastore/users"));

var _validateSignUp = require("../middlewares/validateSignUp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var users = _users["default"].users;
var transactions = _transaction["default"].transactions,
    accounts = _transaction["default"].accounts;

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "creditAccount",

    /**
     * @description Credit an account
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @route POST /api/v1/transactions/<account-number>/credit
     * @returns {Object} status code, data and message properties
     * @access private Admin or staff only
     */
    value: function creditAccount(req, res) {
      var accountNumber = req.params.accountNumber;
      var creditAmount = req.body.creditAmount;
      var accountToCredit = accounts.find(function (account) {
        return account.accountNumber === parseInt(accountNumber, 10);
      });

      if ((0, _validateSignUp.isEmpty)(accountToCredit)) {
        return res.status(404).json({
          status: 404,
          error: 'Account does not exist'
        });
      }

      var balance = accountToCredit.balance;
      var Transaction = {
        transactionId: transactions.length + 1,
        oldBalance: balance,
        newBalance: balance + parseFloat(creditAmount),
        accountNumber: req.body.accountNumber,
        amount: parseFloat(creditAmount),
        transactionType: 'credit',
        createdAt: new Date() // update the balance of the old account

      };
      accountToCredit.balance = Transaction.newBalance;
      transactions.push(Transaction);
      var data = {
        transactionId: Transaction.transactionId,
        accountNumber: accountNumber,
        amount: Transaction.amount,
        transactionType: Transaction.transactionType,
        accountBalance: accountToCredit.balance
      };
      return res.status(201).json({
        status: 201,
        Transaction: Transaction,
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

  }, {
    key: "debitAccount",
    value: function debitAccount(req, res) {
      var accountNumber = req.params.accountNumber;
      var debitAmount = req.body.debitAmount;
      /* if (req.decoded.type !== 'staff') {
         return res.status(401).json({
           status: 401,
           error: 'You are not authorized to carry out that action'
         });
       }*/

      var accountToDebit = accounts.find(function (account) {
        return account.accountNumber === parseInt(accountNumber, 10);
      });

      if ((0, _validateSignUp.isEmpty)(accountToDebit)) {
        return res.status(404).json({
          status: 404,
          error: 'Account does not exist'
        });
      }

      var balance = accountToDebit.balance,
          owner = accountToDebit.owner;

      if (debitAmount > balance) {
        return res.status(409).json({
          status: 409,
          error: "Insufficient funds, your account balance is ".concat(balance)
        });
      }

      var accountOwner = users.find(function (user) {
        return user.id === owner;
      });
      var transactionsLastID = transactions[transactions.length - 1].id;
      var newID = transactionsLastID + 1;
      var transaction = {
        transactionId: newID,
        oldBalance: balance,
        newBalance: balance + parseFloat(debitAmount),
        accountNumber: req.body.accountNumber,
        amount: parseFloat(debitAmount),
        transactionType: 'debit',
        createdAt: new Date() // update the balance of the old account

      };
      accountToDebit.balance = transaction.newBalance;
      transactions.push(transaction);
      var data = {
        transactionId: transaction.id,
        accountNumber: accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: accountToDebit.balance
      };
      return res.status(201).json({
        status: 201,
        data: data,
        message: 'Account debited successfully'
      });
    }
  }]);

  return TransactionController;
}();

exports["default"] = TransactionController;