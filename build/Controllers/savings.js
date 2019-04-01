"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _savings = _interopRequireDefault(require("../datastore/savings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SavingsController =
/*#__PURE__*/
function () {
  function SavingsController() {
    _classCallCheck(this, SavingsController);
  }

  _createClass(SavingsController, [{
    key: "getAllSavings",
    value: function getAllSavings(req, res) {
      return res.status(200).send({
        status: 200,
        success: 'true',
        message: 'Accounts retrieved successfully',
        accounts: _savings.default
      });
    }
  }, {
    key: "getSavings",
    value: function getSavings(req, res) {
      var id = parseInt(req.params.id, 10);

      _savings.default.map(function (Account) {
        if (Account.id === id) {
          return res.status(200).send({
            success: 'true',
            message: 'Account retrieved successfully',
            Account: Account
          });
        }
      });

      return res.status(404).send({
        success: 'false',
        message: 'Account does not exist'
      });
    }
  }, {
    key: "createSavings",
    value: function createSavings(req, res) {
      if (!req.body.firstName) {
        return res.status(400).send({
          success: 'false',
          message: 'firstName is required'
        });
      } else if (!req.body.lastName) {
        return res.status(400).send({
          success: 'false',
          message: 'lastName is required'
        });
      } else if (!req.body.email) {
        return res.status(400).send({
          success: 'false',
          message: 'email is required'
        });
      } else if (!req.body.type) {
        return res.status(400).send({
          success: 'false',
          message: 'The type of Account is required'
        });
      } else if (!req.body.openingBalance) {
        return res.status(400).send({
          success: 'false',
          message: 'Kindly put the openingBalance'
        });
      }

      var Account = {
        id: _savings.default.length + 1,
        accountNumber: parseInt(Math.random() * 10000000000, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type,
        openingBalance: req.body.openingBalance
      };

      _savings.default.push(Account);

      return res.status(201).send({
        status: 201,
        success: 'true',
        message: 'Account created successfully',
        Account: Account
      });
    }
  }, {
    key: "updateSavings",
    value: function updateSavings(req, res) {
      var id = parseInt(req.params.id, 10);
      var accountFound;
      var itemIndex;

      _savings.default.map(function (Account, index) {
        if (Account.id === id) {
          accountFound = Account;
          itemIndex = index;
        }
      });

      if (!accountFound) {
        return res.status(404).send({
          success: 'false',
          message: 'Account not found'
        });
      }

      if (!req.body.accountNumber) {
        return res.status(400).send({
          success: 'false',
          message: 'accountNumber is required'
        });
      } else if (!req.body.status) {
        return res.status(400).send({
          success: 'false',
          message: 'status is required'
        });
      }

      var updatedAccount = {
        id: accountFound.id,
        accountNumber: req.body.accountNumber || accountFound.accountNumber,
        status: req.body.status || accountFound.status
      };

      _savings.default.splice(itemIndex, 1, updatedAccount);

      return res.status(201).send({
        success: 'true',
        message: 'Status of Acccount updated successfully',
        updatedAccount: updatedAccount
      });
    }
  }, {
    key: "deleteSavings",
    value: function deleteSavings(req, res) {
      var id = parseInt(req.params.id, 10);
      var accountFound;
      var itemIndex;

      _savings.default.map(function (Account, index) {
        if (Account.id === id) {
          accountFound = Account;
          itemIndex = index;
        }
      });

      if (!accountFound) {
        return res.status(404).send({
          success: 'false',
          message: 'Account not found'
        });
      }

      _savings.default.splice(itemIndex, 1);

      return res.status(200).send({
        success: 'true',
        message: 'Todo deleted successfuly'
      });
    }
  }]);

  return SavingsController;
}();

var savingsController = new SavingsController();
var _default = savingsController;
exports.default = _default;