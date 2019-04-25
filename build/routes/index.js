"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Account = _interopRequireDefault(require("../Controllers/Account"));

var _userController = _interopRequireDefault(require("../dbController/userController"));

var _Transaction = _interopRequireDefault(require("../Controllers/Transaction"));

var _validateSignUp = _interopRequireDefault(require("../middlewares/validateSignUp"));

var _validateTransaction = _interopRequireDefault(require("../middlewares/validateTransaction"));

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import AuthController from '../Controllers/Users';
var router = _express["default"].Router(); //const { signUp, signIn } = AuthController;


var validateUserSignup = _validateSignUp["default"].validateUserSignup,
    validateUserLogIn = _validateSignUp["default"].validateUserLogIn;
var creditAccount = _Transaction["default"].creditAccount,
    debitAccount = _Transaction["default"].debitAccount;
var validateCreditTransaction = _validateTransaction["default"].validateCreditTransaction,
    validateDebitTransaction = _validateTransaction["default"].validateDebitTransaction;
var checkToken = _verifyToken["default"].checkToken; // get all todos

router.get('/accounts', _Account["default"].getAllAccount);
router.post('/accounts', checkToken, _Account["default"].createAccount);
router.post('/transactions/:accountNumber/credit', validateCreditTransaction, creditAccount);
router.post('/transactions/:accountNumber/debit', validateDebitTransaction, debitAccount);
router.post('/auth/signup', validateUserSignup, _userController["default"].create);
router.post('/auth/signin', validateUserLogIn, _userController["default"].login);
router.get('/accounts/:accountNumber', checkToken, _Account["default"].getAccount);
router["delete"]('/accounts/:accountNumber', checkToken, _Account["default"].deleteAccount); //router.delete('/api/v1/accounts/:id', Users.deleteUser);

router.patch('/accounts/:accountNumber', checkToken, _Account["default"].updateAccount);
var _default = router;
exports["default"] = _default;