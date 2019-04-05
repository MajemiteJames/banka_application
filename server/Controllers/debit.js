/* eslint-disable class-methods-use-this */


import details from '../datastore/transaction';
import savings from '../datastore/account';

class Transction {

    getSavings(req, res) {
        const id = parseInt(req.params.id, 10);
        savings.map((Account) => {
            if (Account.id === id) {
              return res.status(200).send({
                status: 200,
                success: 'true',
                message: 'Account retrieved successfully',
                Account,
            });
          }
        });
        return res.status(404).send({
          status: 404,
            success: 'false',
            message: 'Account does not exist',
        });
      }

      createTransaction(req, res) {
        if (!req.body.accountNumber 
            && !req.body.amount 
            && !req.body.transactionType ) {
            return res.status(400).json({
              success: 'false',
            status: 400,
            message: 'All fields are required',
            });
        }

       
          if(Transaction.transactionType == 'Deposit') {
                 Transaction.accountBalance += Transaction.amount;
          }
          const Transaction = {
            transactionId: details.length + 1,
            accountNumber: req.body.accountNumber,
            amount: req.body.amount,
            transactionType: req.body.transactionType,
            accountBalance: req.body.accountBalance,
          }

          details.push(Transaction);
          return res.status(201).send({
            status: 201,
            success: 'true',
            message: 'Account created successfully',
            Transaction
          })
      }

}

const transctionController = new Transction();
export default transctionController;