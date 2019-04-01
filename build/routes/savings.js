"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _savings = _interopRequireDefault(require("../datastore/savings"));

var _savings2 = _interopRequireDefault(require("../Controllers/savings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // get all todos


router.get('/api/v1/accounts', _savings2.default.getAllSavings);
router.post('/api/v1/accounts', _savings2.default.createSavings);
router.get('/api/v1/accounts/:id', _savings2.default.getSavings);
router.delete('/api/v1/accounts/:id', _savings2.default.deleteSavings);
router.patch('/api/v1/accounts/:id', _savings2.default.updateSavings);
var _default = router;
exports.default = _default;