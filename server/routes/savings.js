import express from 'express';
import Accounts from '../datastore/savings';
import savingsController from '../Controllers/savings';
import currentController from '../Controllers/current';

const router = express.Router();

// get all todos
router.get('/api/v1/accounts/savings', savingsController.getAllSavings);
router.get('/api/v1/accounts/current', currentController.getAllCurrent);

  
router.post('/api/v1/accounts/savings', savingsController.createSavings);
router.post('/api/v1/accounts/current', currentController.createCurrent);


router.get('/api/v1/accounts/savings/:id', savingsController.getSavings);
router.get('/api/v1/accounts/current/:id', currentController.getCurrent);
  
router.delete('/api/v1/accounts/savings/:id', savingsController.deleteSavings);
router.delete('/api/v1/accounts/current/:id', currentController.deleteCurrent);
  

router.patch('/api/v1/accounts/savings/:id', savingsController.updateSavings);
router.patch('/api/v1/accounts/current/:id', currentController.updateCurrent);

  export default router;