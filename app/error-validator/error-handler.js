const boom = require('@hapi/boom');
const i18n = require('i18n');

module.exports = new function errorHandler() {
  // eslint-disable-next-line no-invalid-this
  this.handleError = async function handleError(error) {
    try {
      const type = await determineIfOperationalError(error);
      return beautifyError(type);
    } catch (e) {
      // istanbul ignore next
      logError('CRITICAL: could not handle error', e);
      // istanbul ignore next
      return beautifyError(boom.serverUnavailable('Server Error'));
    }
  };
}();

const determineIfOperationalError = function determineIfOperationalError(err) {
  return new Promise((resolve) => {
    // istanbul ignore else
    if (boom.isBoom(err)) {
      return resolve(err);
    }
    // istanbul ignore next
    return resolve(boom.boomify(err, {statusCode: 400}));
  });
};

const beautifyError = function beautifyError(err) {
  return ({
    'statusCode': err.output.statusCode,
    'error': err.output.payload.error,
    'message': i18n.__(err.output.payload.message),
    'attributes': err.data || {}
  });
};
