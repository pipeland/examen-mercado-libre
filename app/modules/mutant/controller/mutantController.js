const {isMutant: isMutantService} = require('../service/mutantService');
exports.isMutant = async function isMutant(req, res, next) {
  try {
    let response = await isMutantService({...req.body});
    let code = response.isMutant ? 200 : 403;
    res.status(code).send(response);
  } catch (e) {
    return next(e);
  }
};
