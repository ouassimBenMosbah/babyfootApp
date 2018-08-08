import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import dbConnection from './database';
import passport from './passport';
import user from './routes/user';

const app = express();
const MongoStore = connectMongo(session);


app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

app.use(
  session({
    secret: 'fraggle-rock',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', user);

app.listen(8080);
