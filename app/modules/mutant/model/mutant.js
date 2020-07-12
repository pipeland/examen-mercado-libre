/* eslint-disable consistent-this,no-invalid-this */
const mongoose = require('../../../init/db').mongoose;
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const schema = new Schema({
  'dna': {
    'type': 'mixed',
    'required': true
  },
  'isMutant': {
    'type': 'Boolean',
    'default': false,
    'required': true
  }
});
schema.plugin(timestamps);

schema.index({'isMutant': -1});
schema.index({'dna': -1});
module.exports = mongoose.model('mutant', schema);
