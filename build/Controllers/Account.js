"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../datastore/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, [{
    key: "getAllAccount",
    value: function getAllAccount(req, res) {
      return res.status(200).send({
        status: 200,
        success: 'true',
        message: 'All Current Accounts retrieved successfully',
        accounts: _account["default"]
      });
    }
  }, {
    key: "getAccount",
    value: function getAccount(req, res) {
      var accountNumber = parseInt(req.params.accountNumber, 10);

      _account["default"].map(function (Account) {
        if (Account.accountNumber === accountNumber) {
          return res.status(200).send({
            status: 200,
            success: 'true',
            message: 'Current Accounts retrieved successfully',
            Account: Account
          });
        }
      });

      return res.status(404).send({
        status: 404,
        success: 'false',
        message: 'Current Account does not exist'
      });
    }
  }, {
    key: "createAccount",
    value: function createAccount(req, res) {
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
      }

      var Account = {
        id: _account["default"].length + 1,
        accountNumber: parseInt(Math.random() * 10000000000, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type,
        status: "Draft",
        openingBalance: 0.00
      };

      _account["default"].push(Account);

      return res.status(201).send({
        status: 201,
        success: 'true',
        message: 'Account created successfully',
        Account: Account
      });
    }
  }, {
    key: "updateAccount",
    value: function updateAccount(req, res) {
      if (!req.body.accountNumber) {
        return res.status(400).send({
          status: 400,
          success: 'false',
          message: 'accountNumber is required'
        });
      } else if (!req.body.status) {
        return res.status(400).send({
          status: 400,
          success: 'false',
          message: 'status is required'
        });
      }

      var accountNumber = parseInt(req.params.accountNumber, 10);
      var accountFound;
      var itemIndex;

      _account["default"].map(function (Account, index) {
        if (Account.accountNumber === accountNumber) {
          accountFound = Account;
          itemIndex = index;
        }
      });

      if (accountFound) {
        var updatedAccount = {
          id: accountFound.id,
          accountNumber: req.body.accountNumber || accountFound.accountNumber,
          status: req.body.status || accountFound.status,
          openingBalance: req.body.openingBalance || accountFound.openingBalance
        };

        _account["default"].splice(itemIndex, 1, updatedAccount);

        return res.status(201).send({
          success: 'true',
          message: 'Status of Acccount updated successfully',
          updatedAccount: updatedAccount
        });
      }

      if (!accountFound) {
        return res.status(404).send({
          success: 'false',
          message: 'Account not found'
        });
      }
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var accountNumber = parseInt(req.params.accountNumber, 10);
      var accountFound;
      var itemIndex;

      _account["default"].map(function (Account, index) {
        if (Account.accountNumber === accountNumber) {
          accountFound = Account;
          itemIndex = index;
        }
      });

      if (accountFound) {
        _account["default"].splice(itemIndex, 3);

        return res.status(200).send({
          success: 'true',
          message: 'Account deleted successfuly'
        });
      }

      if (!accountFound) {
        return res.status(404).send({
          success: 'false',
          message: 'Account not found'
        });
      }
    }
  }]);

  return AccountController;
}();

var accountController = new AccountController();
var _default = accountController;
exports["default"] = _default;