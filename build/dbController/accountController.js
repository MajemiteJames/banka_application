"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("../db/index"));

var _model = _interopRequireDefault(require("../db/model"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _userController = _interopRequireDefault(require("../dbController/userController"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var AccountController = {
  /**
   * Create An Account
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var text, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.firstName) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                success: 'false',
                message: 'firstName is required'
              }));

            case 4:
              if (req.body.lastName) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                success: 'false',
                message: 'lastName is required'
              }));

            case 8:
              if (req.body.ownerEmail) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                success: 'false',
                message: 'email is required'
              }));

            case 12:
              if (req.body.type) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                success: 'false',
                message: 'The type of Account is required'
              }));

            case 14:
              text = "INSERT INTO\n      accounts(accountNumber, ownerEmail, type, status, balance)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
              values = [parseInt(Math.random() * 10000000000, 10), req.body.email, req.body.type, 'Draft', 0.00];
              _context.prev = 16;
              _context.next = 19;
              return _index["default"].query(text, values);

            case 19:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  id: rows[0].id,
                  accountNumber: rows[0].accountnumber,
                  ownerEmail: rows[0].owneremail,
                  type: rows[0].type,
                  status: rows[0].status,
                  balance: rows[0].balance
                }],
                message: 'Account created successfully'
              }));

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](16);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0.message
              }));

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[16, 24]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
   * Get All Accounts
   * @param {object} req 
   * @param {object} res 
   * @returns {object} get all Accounts
   */
  getAll: function () {
    var _getAll = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var findAllQuery, _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findAllQuery = 'SELECT * FROM accounts';
              _context2.prev = 1;
              _context2.next = 4;
              return _index["default"].query(findAllQuery);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                status: 201,
                data: [{
                  rows: rows,
                  success: 'true',
                  message: 'Account retrieved successfully',
                  rowCount: rowCount
                }]
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }));

    function getAll(_x3, _x4) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  getByEmail: function () {
    var _getByEmail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var select, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // const text = `SELECT * FROM accounts INNER JOIN newuser ON newuser.email = accounts.owneremail WHERE owneremail = $1 VALUES(${req.params.email})`
              select = {
                query: function query(values) {
                  return {
                    text: "SELECT * FROM accounts INNER JOIN newuser ON newuser.email = accounts.owneremail WHERE owneremail = $1",
                    values: values
                  };
                }
              };
              _context3.prev = 1;
              _context3.next = 4;
              return _index["default"].query(select.query([req.params.email]));

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              rowCount = _ref3.rowCount;
              console.log(req.params.email);
              console.log(rows);
              return _context3.abrupt("return", res.status(200).json({
                rows: rows,
                rowCount: rowCount
              }));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](1);
              console.log(_context3.t0);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 12]]);
    }));

    function getByEmail(_x5, _x6) {
      return _getByEmail.apply(this, arguments);
    }

    return getByEmail;
  }(),

  /**
  * Get An Account
  * @param {object} req 
  * @param {object} res
  * @returns {object} Account object
  */
  getOne: function () {
    var _getOne = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var text, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              text = 'SELECT * FROM accounts WHERE accountNumber = $1';
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(text, [req.params.accountNumber]);

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              console.log(rows);

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                'message': 'Account not found'
              }));

            case 9:
              return _context4.abrupt("return", res.status(200).send(rows[0]));

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 12]]);
    }));

    function getOne(_x7, _x8) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),

  /**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  update: function () {
    var _update = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var findOneQuery, updateOneQuery, _ref5, rows, values, response;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (req.body.accountNumber) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                success: 'false',
                message: 'accountNumber is required'
              }));

            case 4:
              if (req.body.status) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                success: 'false',
                message: 'status is required'
              }));

            case 6:
              findOneQuery = 'SELECT * FROM accounts WHERE accountNumber=$1';
              updateOneQuery = "UPDATE accounts\n      SET status=$1 returning *";
              _context5.prev = 8;
              _context5.next = 11;
              return _index["default"].query(findOneQuery, [req.params.accountNumber]);

            case 11:
              _ref5 = _context5.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context5.next = 15;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                'message': 'Account not found'
              }));

            case 15:
              values = [req.body.status || rows[0].status];
              _context5.next = 18;
              return _index["default"].query(updateOneQuery, values);

            case 18:
              response = _context5.sent;
              return _context5.abrupt("return", res.status(200).send(response.rows[0]));

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5["catch"](8);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[8, 22]]);
    }));

    function update(_x9, _x10) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),

  /**
   * Delete An Account
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var deleteQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteQuery = 'DELETE FROM accounts WHERE accountNumber=$1 returning *';
              _context6.prev = 1;
              _context6.next = 4;
              return _index["default"].query(deleteQuery, [req.params.accountNumber]);

            case 4:
              _ref6 = _context6.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                'message': 'Account not found'
              }));

            case 8:
              _context6.next = 13;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(400).send(_context6.t0));

            case 13:
              return _context6.abrupt("return", res.status(204).send({
                'message': 'deleted'
              }));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 10]]);
    }));

    function _delete(_x11, _x12) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = AccountController;
exports["default"] = _default;