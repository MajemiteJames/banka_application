"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("../db/model"));

require("@babel/polyfill");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransactionController =
/*#__PURE__*/
function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "fetchAll",
    value: function fetchAll(request, response) {
      var query = 'SELECT * FROM transactions';
      return _model["default"].query(query).then(function (result) {
        if (result.rowCount === 0) {
          response.status(400).send({
            status: 400,
            error: 'There are no transactions records'
          });
        }

        return response.status(200).send({
          status: 200,
          message: 'Transactions successfully retrieved',
          data: result.rows
        });
      })["catch"](function (error) {
        response.status(500).send({
          status: 500,
          error: 'Error fetching all transactions, ensure you provide valid credentials'
        });
      });
    }
    /**
     * Get A Reflection
     * @param {object} req 
     * @param {object} res
     * @returns {object} reflection object
     */

  }, {
    key: "fetchSpecificTransaction",
    value: function fetchSpecificTransaction(request, response) {
      var id = request.params.id;
      var query = "SELECT * FROM transactions WHERE \"transactionid\"=".concat(id);
      return _model["default"].query(query).then(function (result) {
        if (result.rowCount === 0) {
          return response.status(400).send({
            status: 400,
            error: 'Transaction does not exist'
          });
        }

        return response.status(200).send({
          status: 200,
          message: 'Transaction successfully retrieved',
          data: result.rows[0]
        });
      })["catch"](function (error) {
        response.status(500).send({
          status: 500,
          error: 'Error fetching the specific transaction, ensure you provide valid credentials'
        });
      });
    }
    /**
    * Create Transaction
    * @param {object} req 
    * @param {object} res
    * @returns {object} transaction object 
    */

  }, {
    key: "creditAccount",
    value: function creditAccount(request, response) {
      var accountNumber = request.params.accountNumber;
      var creditAmount = request.body.creditAmount;
      var findSpecificAccount = "SELECT * FROM accounts WHERE \"accountnumber\"='".concat(accountNumber, "'");
      return _model["default"].query(findSpecificAccount).then(function (result) {
        if (result.rowCount === 0) {
          return response.status(400).send({
            status: 400,
            error: 'Account does not exist'
          });
        }

        var _result$rows$ = result.rows[0],
            accountnumber = _result$rows$.accountnumber,
            balance = _result$rows$.balance;
        var newBalance = parseFloat(balance) + parseFloat(creditAmount);
        var creditDetails = {
          type: 'credit',
          accountnumber: accountnumber,
          creditAmount: creditAmount,
          oldBalance: balance,
          balance: newBalance,
          createdAt: new Date().toLocaleString()
        };
        var creditQuery = "INSERT INTO transactions (\"type\", \"accountnumber\", \"amount\", \"oldbalance\", \"newbalance\", \"createdat\")\n       VALUES('".concat(creditDetails.type, "', '").concat(creditDetails.accountnumber, "', '").concat(creditDetails.creditAmount, "',  '").concat(balance, "',   \n       '").concat(newBalance, "', '").concat(creditDetails.createdAt, "') returning *");
        console.log(creditQuery);
        var updateCreditedAccount = "UPDATE accounts SET \"balance\"='".concat(newBalance, "' WHERE \"accountnumber\"='").concat(accountNumber, "' returning *");
        return _model["default"].query(updateCreditedAccount).then(function (result) {
          return _model["default"].query(creditQuery).then(function (result) {
            console.log(result);

            if (result.rowCount >= 1) {
              return response.status(200).send({
                status: 202,
                message: 'Acccount successfully credited',
                data: result.rows[0]
              });
            }

            return response.status(500).send({
              staus: 500,
              message: 'Error crediting the specific account, ensure you provide valid credentials'
            });
          });
        }); // .catch((error) => {
        //   response.status(500).send({ status: 500, error: 'Error crediting the account, ensure you provide valid credentials' });
        // });
      });
    }
  }, {
    key: "debitAccount",
    value: function debitAccount(request, response) {
      var accountNumber = request.params.accountNumber;
      var debitAmount = request.body.debitAmount;
      var findSpecificAccount = "SELECT * FROM accounts WHERE \"accountnumber\"='".concat(accountNumber, "'");
      return _model["default"].query(findSpecificAccount).then(function (result) {
        if (result.rowCount === 0) {
          return response.status(400).send({
            status: 400,
            error: 'Account does not exist'
          });
        }

        var _result$rows$2 = result.rows[0],
            accountnumber = _result$rows$2.accountnumber,
            balance = _result$rows$2.balance;
        var newBalance = parseFloat(balance) - parseFloat(debitAmount);

        if (balance < debitAmount) {
          return response.status(400).send({
            status: 400,
            error: 'Insufficient fund'
          });
        }

        var debitDetails = {
          type: 'debit',
          accountnumber: accountnumber,
          debitAmount: debitAmount,
          oldBalance: balance,
          balance: newBalance,
          createdAt: new Date().toLocaleString()
        };
        var debitQuery = "INSERT INTO transactions (\"type\", \"accountnumber\", \"amount\", \"oldbalance\", \"newbalance\", \"createdat\")\n         VALUES('".concat(debitDetails.type, "', '").concat(debitDetails.accountnumber, "', '").concat(debitDetails.debitAmount, "',  '").concat(balance, "',   \n         '").concat(newBalance, "', '").concat(debitDetails.createdAt, "') returning *");
        console.log(debitQuery);
        var updateDebitedAccount = "UPDATE accounts SET \"balance\"='".concat(newBalance, "' WHERE \"accountnumber\"='").concat(accountNumber, "' returning *");
        return _model["default"].query(updateDebitedAccount).then(function (result) {
          return _model["default"].query(debitQuery).then(function (result) {
            if (result.rowCount >= 1) {
              console.log(result.rowCount);
              return response.status(200).send({
                status: 202,
                message: 'Acccount successfully debited',
                data: result.rows[0]
              });
            }

            return response.status(500).send({
              staus: 500,
              message: 'Error debiting the specific account'
            });
          });
        })["catch"](function (error) {
          response.status(500).send({
            status: 500,
            error: 'Error debiting the account, ensure you provide valid credentials'
          });
        });
      });
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;