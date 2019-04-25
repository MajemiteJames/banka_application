"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validateSignUp = require("./validateSignUp");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TransactionValidation =
/*#__PURE__*/
function () {
  function TransactionValidation() {
    _classCallCheck(this, TransactionValidation);
  }

  _createClass(TransactionValidation, null, [{
    key: "validateCreditTransaction",

    /**
     * @description Function to check that the input fields for transactions are properly fillerd
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {Function} next Call back function
     * @route POST /api/v1/transactions/<account-number>/credit
     *
     * @returns {Object} status code and error message properties
     * @access private
     */
    value: function validateCreditTransaction(req, res, next) {
      var creditAmount = req.body.creditAmount;

      if ((0, _validateSignUp.isEmpty)(creditAmount)) {
        return res.status(400).json({
          status: 400,
          error: 'Transaction amount cannot be empty'
        });
      }

      if (creditAmount < 1) {
        return res.status(400).json({
          status: 400,
          error: 'Credit transaction cannot be less than 1 Naira'
        });
      }

      if (!Number(creditAmount)) {
        return res.status(400).json({
          status: 400,
          error: 'Transactions can only contain digits'
        });
      }

      return next();
    }
    /**
     * @description Function to check that the input fields for transactions are properly fillerd
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {Function} next Call back function
     * @route POST /api/v1/transactions/<account-number>/debit
     *
     * @returns {Object} status code and error message properties
     * @access private
     */

  }, {
    key: "validateDebitTransaction",
    value: function validateDebitTransaction(req, res, next) {
      var debitAmount = req.body.debitAmount;

      if ((0, _validateSignUp.isEmpty)(debitAmount)) {
        return res.status(400).json({
          status: 400,
          error: 'Transaction amount cannot be empty'
        });
      }

      if (debitAmount < 1) {
        return res.status(400).json({
          status: 400,
          error: 'Debit transaction cannot be less than 1 Naira'
        });
      }

      if (!Number(debitAmount)) {
        return res.status(400).json({
          status: 400,
          error: 'Transactions can only contain digits'
        });
      }

      return next();
    }
  }]);

  return TransactionValidation;
}();

exports["default"] = TransactionValidation;