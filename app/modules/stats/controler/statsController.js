const {getStats} = require('../service/statsService');
exports.stats = async function stats(req, res, next) {
  try {
    let response = await getStats();
    res.status(200).send(response);
  } catch (e) {
    // istanbul ignore next
    return next(e);
  }
};
