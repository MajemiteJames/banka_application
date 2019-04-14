/* eslint-disable class-methods-use-this */

import account from '../datastore/account';

class AccountController {

    getAllAccount(req, res) {
        return res.status(200).send({
            status: 200,
            success: 'true',
            message: 'All Current Accounts retrieved successfully',
            accounts: account,
        });
      }

      getAccount(req, res) {
        const accountNumber = parseInt(req.params.accountNumber, 10);
        account.map((Account) => {
            if (Account.accountNumber === accountNumber) {
              return res.status(200).send({
                status: 200,
                success: 'true',
                message: 'Current Accounts retrieved successfully',
                Account,
            });
          }
        });
        return res.status(404).send({
          status: 404,
          success: 'false',
          message: 'Current Account does not exist',
        });
      }

      createAccount(req, res) {
        if(!req.body.firstName) {
            return res.status(400).send({
              success: 'false',
              message: 'firstName is required'
            });
          } else if(!req.body.lastName) {
            return res.status(400).send({
              success: 'false',
              message: 'lastName is required'
            });
          } else if(!req.body.email) {
            return res.status(400).send({
              success: 'false',
              message: 'email is required'
            });
          } else if(!req.body.type) {
            return res.status(400).send({
              success: 'false',
              message: 'The type of Account is required'
            });
          } 

        const Account = {
            id: account.length + 1,
            accountNumber: parseInt(Math.random()*10000000000, 10),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            type: req.body.type,
            status: "Draft",
            openingBalance: 0.00,
          }

          account.push(Account);
          return res.status(201).send({
            status: 201,
            success: 'true',
            message: 'Account created successfully',
            Account
          })
         
      }

      updateAccount(req, res) {
        const accountNumber = parseInt(req.params.accountNumber, 10);
        let accountFound;
        let itemIndex;
        account.map((Account, index) => {
          if (Account.accountNumber === accountNumber) {
            accountFound = Account;
            itemIndex = index;
          }
        });
    
        if (!accountFound) {
            return res.status(404).send({
              success: 'false',
              message: 'Account not found',
            });
          }
        
          if (!req.body.accountNumber) {
            return res.status(400).send({
              status: 400,
              success: 'false',
              message: 'accountNumber is required',
            });
          } else if (!req.body.status) {
            return res.status(400).send({
              success: 'false',
              message: 'status is required',
            });
          } 
    
          const updatedAccount = {
            id: accountFound.id,
            accountNumber: req.body.accountNumber || accountFound.accountNumber,
            status: req.body.status || accountFound.status,
            openingBalance: req.body.openingBalance || accountFound.openingBalance,
          };
        
          account.splice(itemIndex, 1, updatedAccount);
        
          return res.status(201).send({
            success: 'true',
            message: 'Status of Acccount updated successfully',
            updatedAccount,
          });
      }

      deleteAccount(req, res) {
        const accountNumber = parseInt(req.params.accountNumber, 10);
        let accountFound;
        let itemIndex;
        account.map((Account, index) => {
          if (Account.accountNumber === accountNumber) {
            accountFound = Account;
            itemIndex = index;
          }
        });
    
        if (!accountFound) {
          return res.status(404).send({
            success: 'false',
            message: 'Account not found',
          });
        }
        account.splice(itemIndex, 3);
    
        return res.status(200).send({
          success: 'true',
          message: 'Account deleted successfuly',
        });
      }
    

}
  
  const accountController = new AccountController();
  export default accountController;
