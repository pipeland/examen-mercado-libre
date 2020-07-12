module.exports = function configSetup() {
  // istanbul ignore next
  return {
    'db': {
      'connectionString': process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/mutant'
    },
    'env': process.env.NODE_ENV || 'production',
    'service': 'xmen',
    'debug': 'mutant:*',
    'apiVersion': 'v1'
  };
};
