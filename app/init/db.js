const config = require('../../config/config')();
const mongoose = require('mongoose');
log('CONFIG', JSON.stringify(config));
mongoose.connect(config.db.connectionString, { useNewUrlParser: true, useFindAndModify: false });
module.exports = {
  mongoose: mongoose
};
