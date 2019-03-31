/* eslint linebreak-style: "off" */

/**
 * a list of all red-flags and incidents
 * @constant
 *
 * @type {Array<Object>}
 * @exports accounts
 */
const accounts = [
    {
      id: 1,
      createdOn: new Date().toISOString(),
      accountNumber: 2578433446,
      firstName: 'Ayomide',
      lastName: 'Tosan',
      email: 'ayomidetosan@gmail.com',
      type: 'savings',
      status: 'draft',
      openingBalance: 15000.00,
    },
    {
      id: 2,
      createdOn: new Date().toISOString(),
      accountNumber: 3872984638,
      firstName: 'Majemite',
      lastName: 'Okoro',
      email: 'jamesokoro@gmail.com',
      type: 'current',
      status: 'draft',
      openingBalance: 65000.00,
    },
    {
      id: 3,
      createdOn: new Date().toISOString(),
      accountNumber: 193732839,
      firstName: 'James',
      lastName: 'Bachor',
      email: 'jamesbachor@gmail.com',
      type: 'savings',
      status: 'draft',
      openingBalance: 95000.00,
    },
  ];
  
  export default accounts;