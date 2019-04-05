import express from 'express';
import accountController from '../Controllers/account';
import transctionController from '../Controllers/debit';

const router = express.Router();

// get all todos
router.get('/api/v1/accounts', accountController.getAllAccount);

  
router.post('/api/v1/accounts', accountController.createAccount);
router.post('/api/v1/transaction/account-number', transctionController.createTransaction);


router.get('/api/v1/accounts/:id', accountController.getAccount);
router.get('/api/v1/transaction/account-number/:id', transctionController.getSavings);
  
router.delete('/api/v1/accounts/:id', accountController.deleteAccount);
  

router.patch('/api/v1/accounts/:id', accountController.updateAccount);

  export default router;