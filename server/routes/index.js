import express from 'express';
import accountController from '../Controllers/Account';
import AuthController from '../Controllers/Users';
import transactionController from '../Controllers/Transaction';
import AuthValidation from '../middlewares/validateSignUp';
import validateTransaction from '../middlewares/validateTransaction';
import verifyToken from '../middlewares/verifyToken'


const router = express.Router();
const { signUp, signIn } = AuthController;
const { validateUserSignup, validateUserLogIn } = AuthValidation;
const { creditAccount, debitAccount } = transactionController;
const { validateCreditTransaction, validateDebitTransaction } = validateTransaction;
const { checkToken } = verifyToken;

// get all todos
router.get('/accounts', accountController.getAllAccount);

  
router.post('/accounts',checkToken, accountController.createAccount);
router.post('/transactions/:accountNumber/credit', validateCreditTransaction, creditAccount);
router.post('/transactions/:accountNumber/debit' , validateDebitTransaction, debitAccount);
router.post('/auth/signup',validateUserSignup, signUp);
router.post('/auth/signin', validateUserLogIn , signIn);




router.get('/accounts/:accountNumber',checkToken, accountController.getAccount);

  
router.delete('/accounts/:accountNumber',checkToken, accountController.deleteAccount);
//router.delete('/api/v1/accounts/:id', Users.deleteUser);
  

router.patch('/accounts/:accountNumber',checkToken, accountController.updateAccount);

  export default router;