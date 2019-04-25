"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Authorization =
/*#__PURE__*/
function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, null, [{
    key: "checkToken",

    /**
     * @description method to protect routes and check for token in incoming requests
     * @param {Object} req The request object
     * @param {Object} res The resposnse object
     * @returns {Object} status code and message
     */
    value: function checkToken(req, res, next) {
      var token = req.headers['x-access-token'] || req.headers.authorization;

      if (token) {
        _jsonwebtoken["default"].verify(token, 'iamaboy', function (err, decoded) {
          if (err) {
            return res.status(401).json({
              status: 401,
              error: 'Token is invalid'
            });
          }

          req.decoded = decoded;
          return next();
        });
      } else {
        return res.status(403).json({
          status: 403,
          error: 'Unauthorized! You must be logged in for that'
        });
      }
    }
  }]);

  return Authorization;
}();

exports["default"] = Authorization;