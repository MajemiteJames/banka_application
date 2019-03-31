import express from 'express';
import Accounts from '../datastore/savings';
import savingsController from '../Controllers/savings';

const router = express.Router();

// get all todos
router.get('/api/v1/accounts', savingsController.getAllSavings);
  
router.post('/api/v1/accounts', savingsController.createSavings);

router.get('/api/v1/accounts/:id', savingsController.getSavings);
  
router.delete('/api/v1/accounts/:id', savingsController.deleteSavings);
  

router.patch('/api/v1/accounts/:id', savingsController.updateSavings);

  export default router;