var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var recordRouter = require('./routes/record');
var planRouter = require('./routes/plan');
var profileRouter = require('./routes/profile');
var doctorRouter = require('./routes/doctor');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/record', recordRouter);
app.use('/plan', planRouter);
app.use('/profile', profileRouter);
app.use('/doctor', doctorRouter);


module.exports = app;
