import express from 'express';
import accountController from '../Controllers/account';
import Users from '../Controllers/users';


const router = express.Router();

// get all todos
router.get('/api/v1/accounts', accountController.getAllAccount);

  
router.post('/api/v1/accounts', accountController.createAccount);
router.post('/api/v1/auth/signup', Users.signup);
router.post('/api/v1/auth/signin', Users.login);




router.get('/api/v1/accounts/:id', accountController.getAccount);

  
router.delete('/api/v1/accounts/:id', accountController.deleteAccount);
//router.delete('/api/v1/accounts/:id', Users.deleteUser);
  

router.patch('/api/v1/accounts/:id', accountController.updateAccount);

  export default router;