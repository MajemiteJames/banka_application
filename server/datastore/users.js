/* eslint linebreak-style: "off" */
/**
 * An array list of all users
 * @constant
 *
 * @type {Array<Object>}
 * @exports users
 */
const users = [
    {
      id: 1,
      firstname: 'Fejiro',
      lastname: 'Gospel',
      email: 'houseofjiro@gmail.com',
      registered: new Date().toISOString(),
      isAdmin: 'false',
      password: '123456',
    },
    {
      id: 2,
      firstname: 'Admin',
      lastname: 'Admin',
      email: 'admin123@gmail.com',
      registered: new Date().toISOString(),
      isAdmin: 'true',
      password: '123456',
    },
  ];
  
  export default users;
  