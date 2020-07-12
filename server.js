const sls = require('serverless-http');
const app = require('./app/init/app');
module.exports.run = sls(app);
