import express from 'express';
import AccountController from '../dbController/accountController';
import User from '../dbController/userController';
//import AuthController from '../Controllers/Users';
import transactionController from '../dbController/transaction';
import AuthValidation from '../middlewares/validateSignUp';
import validateTransaction from '../middlewares/validateTransaction';
import verifyToken from '../middlewares/verifyToken'


const router = express.Router();
//const { signUp, signIn } = AuthController;
const { validateUserSignup, validateUserLogIn } = AuthValidation;
//const { creditAccount, debitAccount } = transactionController;
const { validateCreditTransaction, validateDebitTransaction } = validateTransaction;
const { checkToken } = verifyToken;


router.get('/accounts', AccountController.getAll);
router.get('/user/:email/accounts', AccountController.getByEmail);
router.get('/transactions/', transactionController.fetchAll);
router.get('/transactions/:id', transactionController.fetchSpecificTransaction);

  
router.post('/accounts', AccountController.create);
router.post('/transactions/:accountNumber/credit', validateCreditTransaction,  transactionController.creditAccount);
router.post('/transactions/:accountNumber/debit' , validateDebitTransaction, transactionController.debitAccount);
router.post('/auth/signup',validateUserSignup, User.create);
router.post('/auth/signin', validateUserLogIn , User.login);




router.get('/accounts/:accountNumber',AccountController.getOne);
//router.get('/accounts/:ownerEmail',AccountController.getAllEmail);

  
router.delete('/accounts/:accountNumber',  AccountController.delete);
//router.delete('/api/v1/accounts/:id', Users.deleteUser);
  

router.patch('/accounts/:accountNumber', AccountController.update);

  export default router;