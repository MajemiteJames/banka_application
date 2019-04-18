import express from 'express';
import accountController from '../Controllers/Account';
import Users from '../Controllers/Users';
import transactionController from '../Controllers/Transaction';


const router = express.Router();

// get all todos
router.get('/accounts', accountController.getAllAccount);

  
router.post('/accounts', accountController.createAccount);
router.post('/transactions/:accountNumber/credit', transactionController.createCredit);
router.post('/transactions/:accountNumber/debit', transactionController.debitAccount);
router.post('/auth/signup', Users.signup);
router.post('/auth/signin', Users.login);




router.get('/accounts/:accountNumber', accountController.getAccount);

  
router.delete('/accounts/:accountNumber', accountController.deleteAccount);
//router.delete('/api/v1/accounts/:id', Users.deleteUser);
  

router.patch('/accounts/:accountNumber', accountController.updateAccount);

  export default router;