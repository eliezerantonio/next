var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


var usersRouter = require('./src/routes/users_router');

var skillsRouter = require('./src/routes/skills_router');
var jobsRouter = require('./src/routes/jobs_router');
var applicationsRouter = require('./src/routes/application_router');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/user', usersRouter);
app.use('/api/skill', skillsRouter)
app.use('/api/job', jobsRouter)
app.use('/api/application', applicationsRouter)

module.exports = app;