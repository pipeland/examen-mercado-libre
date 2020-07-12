/* eslint-disable no-unused-vars */
let debug = require('debug');
global.logError = debug('mutant:error');
global.logWarn = debug('mutant:warn');
global.logInfo = debug('mutant:info');
global.log = debug('mutant:log');
const express = require('express');
const bodyParser = require('body-parser');
const i18n = require('i18n');
const helmet = require('helmet');
const errorHandler = require('../error-validator/error-handler');
const mutantRouter = require('../modules/mutant/routes/routes');
const statsRouter = require('../modules/stats/routes/routes');
i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: `${__dirname}/locales`
});

// --------------------setup the express application-------------------------\\
let app = express();
app
.use(helmet())
.use(bodyParser.json({limit: '10mb'})) // to support JSON-encoded bodies
.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false
}))
.use(i18n.init);
mutantRouter(app);
statsRouter(app);
/**
 * Middleware validate errors
 */
app.use(async (err, req, res, next) => {
  const type = await errorHandler.handleError(err);
  return res.status(type.statusCode).send(type);
});
module.exports = app;
