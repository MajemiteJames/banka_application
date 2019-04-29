"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _accountController = _interopRequireDefault(require("../dbController/accountController"));

var _userController = _interopRequireDefault(require("../dbController/userController"));

var _transaction = _interopRequireDefault(require("../dbController/transaction"));

var _validateSignUp = _interopRequireDefault(require("../middlewares/validateSignUp"));

var _validateTransaction = _interopRequireDefault(require("../middlewares/validateTransaction"));

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import AuthController from '../Controllers/Users';
var router = _express["default"].Router(); //const { signUp, signIn } = AuthController;


var validateUserSignup = _validateSignUp["default"].validateUserSignup,
    validateUserLogIn = _validateSignUp["default"].validateUserLogIn; //const { creditAccount, debitAccount } = transactionController;

var validateCreditTransaction = _validateTransaction["default"].validateCreditTransaction,
    validateDebitTransaction = _validateTransaction["default"].validateDebitTransaction;
var checkToken = _verifyToken["default"].checkToken;
router.get('/accounts', _accountController["default"].getAll);
router.get('/user/:email/accounts', _accountController["default"].getByEmail);
router.get('/transactions/', _transaction["default"].fetchAll);
router.get('/transactions/:id', _transaction["default"].fetchSpecificTransaction);
router.post('/accounts', _accountController["default"].create);
router.post('/transactions/:accountNumber/credit', validateCreditTransaction, _transaction["default"].creditAccount);
router.post('/transactions/:accountNumber/debit', validateDebitTransaction, _transaction["default"].debitAccount);
router.post('/auth/signup', validateUserSignup, _userController["default"].create);
router.post('/auth/signin', validateUserLogIn, _userController["default"].login);
router.get('/accounts/:accountNumber', _accountController["default"].getOne); //router.get('/accounts/:ownerEmail',AccountController.getAllEmail);

router["delete"]('/accounts/:accountNumber', _accountController["default"]["delete"]); //router.delete('/api/v1/accounts/:id', Users.deleteUser);

router.patch('/accounts/:accountNumber', _accountController["default"].update);
var _default = router;
exports["default"] = _default;