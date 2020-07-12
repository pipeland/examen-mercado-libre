const express = require('express');
const config = require('../../../../config/config')();
const Router = new express.Router();
const mutantController = require('../controller/mutantController');

module.exports = function mutantRoutes(app) {
  /**
   * @api {post} /api/v1/mutant POST
   * @apiName ValidateMutant
   * @apiGroup mutant
   * @apiDescription Validar si una cadena (DNA) es de humano o mutante
   * @apiVersion 1.0.0
   * @apiParamExample {json} Request-Example:
   *{
       "dna": [
              "ATGCGA",
              "CCGTGA",
              "TTATGT",
              "AGGAGG",
              "CCTCTA",
              "TCACTG"
       ]
    }
   * @apiSuccessExample {JSON} response-example (success is mutant):
   * 200
   * {
      "isMutant": true
    }
   * @apiSuccessExample {JSON} response-example (success is human):
   * 403
   * {
      "isMutant": false
    }
   */
  Router.post('/', mutantController.isMutant);
  logInfo(`/api/${config.apiVersion}/mutant`);
  app.use(`/api/${config.apiVersion}/mutant`, Router);
};
