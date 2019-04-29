"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var connectionString = process.env.DATABASE_URL;
var client = new _pg.Client({
  connectionString: connectionString
});
client.connect();
var _default = client;
exports["default"] = _default;