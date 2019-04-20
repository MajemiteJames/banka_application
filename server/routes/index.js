import express from 'express';
import accountController from '../Controllers/Account';
import AuthController from '../Controllers/Users';
import transactionController from '../Controllers/Transaction';
import AuthValidation from '../middlewares/validateSignUp';


const router = express.Router();
const { signUp, signIn } = AuthController;
const { validateUserSignup, validateUserLogIn } = AuthValidation;

// get all todos
router.get('/accounts', accountController.getAllAccount);

  
router.post('/accounts', accountController.createAccount);
router.post('/transactions/:accountNumber/credit', transactionController.createCredit);
router.post('/transactions/:accountNumber/debit', transactionController.debitAccount);
router.post('/auth/signup',validateUserSignup, signUp);
router.post('/auth/signin', validateUserLogIn , signIn);




router.get('/accounts/:accountNumber', accountController.getAccount);

  
router.delete('/accounts/:accountNumber', accountController.deleteAccount);
//router.delete('/api/v1/accounts/:id', Users.deleteUser);
  

router.patch('/accounts/:accountNumber', accountController.updateAccount);

  export default router;