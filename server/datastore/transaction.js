/* eslint linebreak-style: "off" */

/**
 * a list of all red-flags and incidents
 * @constant
 *
 * @type {Array<Object>}
 * @exports Transactions
 */
const Transactions = [
    {
      transactionId: 1,
      createdOn: new Date().toISOString(),
      accountNumber: 2578433446,
      amount: '40,000.00',
      cashier: '3',
      transactionType: 'deposit',
      accountBalance: '40,000.00',
    },
    {
      transactionId: 2,
      createdOn: new Date().toISOString(),
      accountNumber: 3872984638,
      amount: '40,000.00',
      cashier: '7',
      transactionType: 'credit',
      accountBalance: '20,000.00',
    },
    {
      transactionId: 3,
      createdOn: new Date().toISOString(),
      accountNumber: 193732839,
      amount: '30,000.00',
      cashier: '5',
      transactionType: 'deposit',
      accountBalance: '70,000.00',
    },
  ];
  
  export default Transactions;