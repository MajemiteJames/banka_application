"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-useless-escape */

/**
 * @description Function to check that input is not empty, undefined or null
 * @param {any} value The data type to be checked
 * @returns {Boolean}
 */
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || _typeof(value) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;
};

exports.isEmpty = isEmpty;

var AuthValidation =
/*#__PURE__*/
function () {
  function AuthValidation() {
    _classCallCheck(this, AuthValidation);
  }

  _createClass(AuthValidation, null, [{
    key: "validateUserSignup",

    /**
     * @description Function to check that the input fields for user registration are properly fillerd
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {Function} next Call back function
     * @route POST /api/v1/auth/signup
     * @returns {Object} status code and error message properties
     * @access public
     */
    value: function validateUserSignup(req, res, next) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password,
          password2 = _req$body.password2; // Regular expression to check for valid email address - emailregex.com

      var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(email) && isEmpty(password) && isEmpty(password2)) {
        return res.status(400).json({
          status: 400,
          error: 'All fields are required'
        });
      }

      if (isEmpty(firstName)) {
        return res.status(400).json({
          status: 400,
          error: 'First name is required'
        });
      }

      if (isEmpty(lastName)) {
        return res.status(400).json({
          status: 400,
          error: 'Last name is required'
        });
      }

      if (isEmpty(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      if (!validEmail.test(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Please provide a valid email address'
        });
      }

      if (isEmpty(password)) {
        return res.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      if (isEmpty(password2)) {
        return res.status(400).json({
          status: 400,
          error: 'Confirm password field is required'
        });
      }

      if (password !== password2) {
        return res.status(400).json({
          status: 400,
          error: 'Passwords must match'
        });
      }

      if (password.trim().length < 6) {
        return res.status(400).json({
          status: 400,
          error: 'Password must be at least 6 characters long'
        });
      }

      return next();
    }
    /**
     * @description Function to check that the input fields for user log in are properly fillerd
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {Function} next Call back function
     * @route POST /api/v1/auth/signin
     * @returns {Object} status code and error message properties
     * @access public
     */

  }, {
    key: "validateUserLogIn",
    value: function validateUserLogIn(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      if (isEmpty(email) && isEmpty(password)) {
        return res.status(400).json({
          status: 400,
          error: 'Email and password are required'
        });
      }

      if (isEmpty(email)) {
        return res.status(400).json({
          status: 400,
          error: 'Email is required'
        });
      }

      if (isEmpty(password)) {
        return res.status(400).json({
          status: 400,
          error: 'Password is required'
        });
      }

      return next();
    }
  }]);

  return AuthValidation;
}();

exports["default"] = AuthValidation;