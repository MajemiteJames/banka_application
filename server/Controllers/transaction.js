import account from '../datastore/account';
import transaction from '../datastore/transaction';


class TransactionController {

    createCredit(req, res) {
        if(!req.body.accountNumber) {
            return res.status(400).send({
                success: 'false',
                message: 'accountNumber is required'
            });
        }  if(!req.body.amount) {
            return res.status(400).send({
                success: 'false',
                message: 'Amount is required'
            });
        } if(!req.body.transactionType) {
            return res.status(400).send({
                success: 'false',
                message: 'the TransactionType is requred'
            });
        }
        const accountNumber = parseInt(req.params.accountNumber, 10);
        let accountFound;
        let itemIndex;
        account.map((Accounts, index) => {
            if(Accounts.accountNumber === accountNumber) {
                accountFound = Accounts;
                itemIndex = index;
            }
        });
        
        if(accountFound) {
            
            const { openingBalance } = accountFound;
            const { creditAmount } = req.body;
            
            const Transaction = {
                transactionId: transaction.length + 1,
                accountNumber: req.body.accountNumber,
                amount: parseFloat(req.body.amount),
                transactionType: 'credit',
                oldBalance: openingBalance,
                newBalance: openingBalance + parseFloat(req.body.amount),
                createdOn: new Date().toISOString(),

            }
            //update the balance of the old account
            accountFound.openingBalance = Transaction.newBalance;
            transaction.push(Transaction);
            return res.status(201).send({
                success: 'true',
                message: 'Account Credited Successfully',
                Transaction,
            });
        }
        if(!accountNumber) {
            return res.status(404).send({
                success: 'false',
                message: 'Account not Found',
            });
        }
        
    }

    debitAccount(req, res) {

        if(!req.body.accountNumber) {
            return res.status(400).send({
                success: 'false',
                message: 'accountNumber is required'
            });
        }  if(!req.body.amount) {
            return res.status(400).send({
                success: 'false',
                message: 'Amount is required'
            });
        } if(!req.body.transactionType) {
            return res.status(400).send({
                success: 'false',
                message: 'the TransactionType is requred'
            });
        }
        const accountNumber = parseInt(req.params.accountNumber, 10);
        let accountFound;
        let itemIndex;
        account.map((Accounts, index) => {
            if(Accounts.accountNumber === accountNumber) {
                accountFound = Accounts;
                itemIndex = index;
            }
        });
        
        if(accountFound) {
            
            const { openingBalance } = accountFound;
            const { creditAmount } = req.body;
            
            const Transaction = {
                transactionId: transaction.length + 1,
                accountNumber: req.body.accountNumber,
                amount: parseFloat(req.body.amount),
                transactionType: 'credit',
                oldBalance: openingBalance,
                newBalance: openingBalance - parseFloat(req.body.amount),
                createdOn: new Date().toISOString(),

            }
            if(Transaction.newBalance < 0) {
                return res.status(409).send({
                    staus: 409,
                    message: 'insufficent funds',
                });
            }
            //update the balance of the old account
            accountFound.openingBalance = Transaction.newBalance;
            transaction.push(Transaction);
            return res.status(201).send({
                success: 'true',
                message: 'Account Credited Successfully',
                Transaction,
            });
        }
        if(!accountNumber) {
            return res.status(404).send({
                success: 'false',
                message: 'Account not Found',
            });
        }
    }

}

const transactionController = new  TransactionController ();
export default transactionController;