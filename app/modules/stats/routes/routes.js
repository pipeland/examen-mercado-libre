const express = require('express');
const config = require('../../../../config/config')();
const Router = new express.Router();
const statController = require('../controler/statsController');

module.exports = function statRoutes(app) {
  /**
   * @api {GET} /api/v1/stats GET
   * @apiName GetStat
   * @apiGroup stat
   * @apiDescription Retorna las estadisticas entre mutantes y humanos
   * @apiVersion 1.0.0
   * @apiParamExample {json} Request-Example:
   *  /api/v1/stats GET
   * @apiSuccessExample {JSON} response-example:
   * 200
   * {
      "count_mutant_dna": 1,
      "count_human_dna": 2,
      "ratio": "0.50"
    }
   */
  Router.get('/', statController.stats);
  logInfo(`/api/${config.apiVersion}/stats`);
  app.use(`/api/${config.apiVersion}/stats`, Router);
};
