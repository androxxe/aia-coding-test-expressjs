'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const serverless = require('serverless-http');
const router = require('./routes');
const app = express();

require('dotenv').config()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// route for our apps
app.use('/', router);

app.use('/.netlify/functions/server-production', router);  // path must route to lambda

// module.exports = app;
module.exports.handler = serverless(app);