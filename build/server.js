"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 4040;
app.get('/', function (req, res) {
  res.send('The Port for my Banking App');
});
app.listen(port, function () {
  console.log('Listening on port ' + port);
});