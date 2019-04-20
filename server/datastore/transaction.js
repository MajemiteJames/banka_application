/* eslint linebreak-style: "off" */

/**
 * a list of all red-flags and incidents
 * @constant
 *
 * @type {Array<Object>}
 * @exports Transactions
 */
export default {
  accounts: [
    {
      id: 1,
      accountNumber: 5563847290,
      createdOn: new Date(2019, 1, 12),
      owner: 2,
      type: 'current',
      status: 'active',
      balance: 349876358.08
    },
    {
      id: 2,
      accountNumber: 8897654324,
      createdOn: new Date(2018, 4, 22),
      owner: 3,
      type: 'savings',
      status: 'dormant',
      balance: 7665435.97
    }
  ],

  transactions: [
    {
      id: 1,
      createdOn: new Date(2019, 4, 23),
      transactionType: 'credit',
      accountNumber: 8897654324,
      cashier: 4,
      owner: 3,
      amount: 400500.0,
      oldBalance: 7264935.97,
      newBalance: 7665435.97
    },
    {
      id: 2,
      createdOn: new Date(2019, 1, 20),
      transactionType: 'debit',
      accountNumber: 8897654324,
      cashier: 1,
      owner: 3,
      amount: 100500.0,
      oldBalance: 7264935.97,
      newBalance: 7665435.97
    },
    {
      id: 3,
      createdOn: new Date(2019, 2, 12),
      transactionType: 'credit',
      accountNumber: 5563847290,
      cashier: 4,
      owner: 2,
      amount: 400500.0,
      oldBalance: 7264935.97,
      newBalance: 7665435.97
    }
  ]
};