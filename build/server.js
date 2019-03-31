"use strict";

var _express = _interopRequireDefault(require("express"));

var _savings = _interopRequireDefault(require("./server/routes/savings"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Parse incoming requests data

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_savings.default);
var port = process.env.PORT || 4040;
app.get('/', function (req, res) {
  res.send('The Port for my Banking App');
});
app.listen(port, function () {
  console.log('Listening on port ' + port);
});