"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _users = _interopRequireDefault(require("../datastore/users"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var users = _users["default"].users;

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "signUp",

    /**
     * @description Register a new user
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @route POST /api/v1/auth/signup
     * @returns {Object} status code, data and message properties
     * @access public
     */
    value: function signUp(req, res) {
      // eslint-disable-next-line no-unused-vars
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password,
          password2 = _req$body.password2;
      var existingUser = users.some(function (user) {
        return user.email === email;
      });

      if (!existingUser) {
        var hashPassword = _helper["default"].hashPassword(req.body.password);

        var usersLength = users.length;
        var lastID = users[usersLength - 1].id;
        var newID = lastID + 1;
        var newUser = {
          id: newID,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: hashPassword,
          type: 'client',
          createdAt: new Date()
        };
        users.push(newUser);
        var payload = {
          id: newUser.id,
          email: newUser.email
        };

        var token = _jsonwebtoken["default"].sign(payload, 'iamaboy', {
          expiresIn: '15 minutes'
        });

        var data = {
          token: token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          type: newUser.type,
          createdAt: newUser.createdAt
        };
        return res.status(201).json({
          status: 201,
          data: data,
          message: 'User registered successfully'
        });
      }

      res.status(409).json({
        status: 409,
        error: 'User already exists'
      });
      return true;
    }
    /**
     * @description Log In an existing user
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @route POST /api/v1/auth/signin
     * @returns {Object} status code, data and message properties
     * @access public
     */

  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      for (var i = 0; i < users.length; i += 1) {
        if (email === users[i].email) {
          if (password === users[i].password) {
            var userInfo = users[i];
            var payload = {
              id: userInfo.id,
              email: userInfo.email,
              type: userInfo.type,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              isAdmin: userInfo.isAdmin
            };

            var token = _jsonwebtoken["default"].sign(payload, 'iamaboy', {
              expiresIn: '15 minutes'
            });

            var data = {
              token: token,
              id: userInfo.id,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              email: userInfo.email,
              type: userInfo.type
            };
            return res.status(200).json({
              status: 200,
              data: data,
              message: 'Login successful'
            });
          }

          return res.status(403).json({
            status: 403,
            error: 'Password Incorrect'
          });
        }
      }

      return res.status(403).json({
        status: 403,
        error: 'User not found'
      });
    }
  }]);

  return AuthController;
}();

exports["default"] = AuthController;