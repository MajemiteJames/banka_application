import express from 'express';
import Accounts from './server/datastore/account';
import bodyParser from 'body-parser';


const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/accounts', (req, res) => {
  res.status(200).send({
    status: 200,
    success: 'true',
    message: 'Accounts retrieved successfully',
    accounts: Accounts
  })
});

app.post('/api/v1/accounts', (req, res) => {
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
  }  else if(!req.body.openingBalance) {
    return res.status(400).send({
      success: 'false',
      message: 'Kindly put the openingBalance'
    });
  }


 const Account = {
   id: Accounts.length + 1,
   accountNumber: parseInt(Math.random()*10000000000, 10),
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   email: req.body.email,
   type: req.body.type,
   openingBalance: req.body.openingBalance
 }
 Accounts.push(Account);
 return res.status(201).send({
   status: 201,
   success: 'true',
   message: 'Account created successfully',
   Account
 })
});

const port = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.send('The Port for my Banking App');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});