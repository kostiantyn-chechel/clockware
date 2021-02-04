import { Request, Response, NextFunction } from 'express'
import {IError} from "./Type/interfaces";
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const masterReport = require('./processing/masterReport');


const db = require('./models');
// db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true }).then(() => console.log("Drop and re-sync db."));

const citiesRouter = require('./routes/cities.router');
const clientsRouter = require('./routes/clients.router');
const mastersRouter = require('./routes/masters.router');
const ordersRouter = require('./routes/orders.router');
const authRouter = require('./routes/auth.router');
const reviewRouter = require('./routes/reviews.router');
const adminRouter = require('./routes/admin.router');
const postRouter = require('./routes/post.router');

const app = express();

//for CRON tasks
// // cron.schedule('* 8 * * *', () => { // for prod
// cron.schedule('* * * * *', () => {
//   masterReport.masterTodayReport();
// });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/cities', citiesRouter);
app.use('/clients', clientsRouter);
app.use('/masters', mastersRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);
app.use('/rev', reviewRouter);
app.use('/adm', adminRouter);
app.use('/post', postRouter);

app.get('/zzz', (req: Request, res: Response) => {
    res.send(JSON.stringify('ZZZ'))
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, '../client/build/index.html')
    )
  })
}

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: IError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
