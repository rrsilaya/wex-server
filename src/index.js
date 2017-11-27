import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import store from 'connect-mongo';

import router from './router';

const app = express();
const MongoStore = store(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

const db = 'wex';
mongoose.connect(`mongodb://admin:admin@ds123136.mlab.com:23136/${db}`, err => {
  if (err) console.log('Error connecting to database');
  else console.log('Database is connected');
});

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});

app.use(
  session({
    key: 'wex',
    secret: 'wexwex',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    checkExpirationInterval: 9000000,
    expiration: 86400000
  })
);

app.use(router);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
