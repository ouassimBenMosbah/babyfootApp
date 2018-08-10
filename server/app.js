import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import dbConnection from './database';
import passport from './passport';

import auth from './routes/auth';
import user from './routes/user';
import team from './routes/team';
import match from './routes/match';

const app = express();
const MongoStore = connectMongo(session);

app.use(morgan('dev'));
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', auth);

app.use('/users', user);
app.use('/teams', team);
app.use('/matchs', match);

export default app;
