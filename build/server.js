"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Parse incoming requests data

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/api/v1', _index["default"]);
var port = process.env.PORT || 4040;
app.get('/', function (req, res) {
  res.status(200).send('The Port for my Banking App');
});
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
var _default = app;
exports["default"] = _default;