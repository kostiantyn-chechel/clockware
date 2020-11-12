const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

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

const app = express();

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

app.get('/zzz', (req, res) => {
    res.send(JSON.stringify('777'))
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(
            __dirname, 'client', 'static', 'index.html'
        )
    )
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
