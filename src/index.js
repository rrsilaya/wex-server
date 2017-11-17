import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import router from './router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

const db = 'wex';
mongoose.connect(`mongodb://localhost/${db}`, err => {
  if (err) console.log('Error connecting to database');
  else console.log('Database is connected');
});

app.use(router);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
