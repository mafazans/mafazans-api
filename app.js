import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import routes from './routes/index';
import apiRoutes from './routes/api';
import errorHandlers from './handlers/errorHandlers';


const app = express();
//enable cors
app.use(cors());

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);
app.use('/api', apiRoutes);

//mongo error handling middleware
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoError);

module.exports = app;