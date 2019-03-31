import express from 'express';
import accounts from './server/datastore/account';


const app = express();

// get all todos
app.get('/api/v1/accounts', (req, res) => {
  res.status(200).send({
    status: 200,
    success: 'true',
    message: 'Accounts retrieved successfully',
    accounts: accounts
  })
});

const port = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.send('The Port for my Banking App');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});