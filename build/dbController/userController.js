"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              hashPassword = _helper["default"].hashPassword(req.body.password);
              createQuery = "INSERT INTO\n      newuser(firstName, lastName, email, password, isAdmin, createdAt)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *";
              values = [req.body.firstName, req.body.lastName, req.body.email, hashPassword, 'false', (0, _moment["default"])(new Date())];
              _context.prev = 3;
              _context.next = 6;
              return _db["default"].query(createQuery, values);

            case 6:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _helper["default"].generateToken(rows[0].id);
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  id: rows[0].id,
                  firstName: rows[0].firstname,
                  lastName: rows[0].lastname,
                  email: rows[0].email
                }],
                message: 'User registered successfully'
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0.message
              }));

            case 16:
              return _context.abrupt("return", res.status(400).send({
                error: _context.t0.message,
                status: 400
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 12]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM newuser WHERE email = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _db["default"].query(text, [req.body.email]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", res.status(403).send({
                status: 403,
                message: 'The credentials you provided is incorrect'
              }));

            case 8:
              if (_helper["default"].comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(403).send({
                'message': 'The credentials you provided is incorrect'
              }));

            case 10:
              token = _helper["default"].generateToken(rows[0].id);
              return _context2.abrupt("return", res.status(200).send({
                status: 201,
                data: [{
                  token: token,
                  id: rows[0].id,
                  email: rows[0].email
                }],
                message: 'Login successful'
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 14]]);
    }));

    function login(_x3, _x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),

  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var deleteQuery, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
              _context3.prev = 1;
              _context3.next = 4;
              return _db["default"].query(deleteQuery, [req.user.id]);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                'message': 'user not found'
              }));

            case 8:
              return _context3.abrupt("return", res.status(204).send({
                'message': 'deleted'
              }));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 11]]);
    }));

    function _delete(_x5, _x6) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }()
};
var _default = User;
exports["default"] = _default;