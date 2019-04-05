import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';


const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);


const port = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.status(200).send('The Port for my Banking App');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

export default app;