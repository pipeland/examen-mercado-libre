const express = require('express');
const config = require('../../../../config/config')();
const Router = new express.Router();
const mutantController = require('../controller/mutantController');

module.exports = function mutantRoutes(app) {
  /**
   * @api {post} /api/v1/mutant POST
   * @apiName CreateAgreement
   * @apiGroup mutant
   * @apiDescription Create a mutant into the database
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTBhMTZjNGQ3MGFhZTViN2VjYjFkYmMiLCJleHBpcmVzSW4iOjYzMDcyMDAwLCJpYXQiOjE0OTM4MzM1MzB9.A2j14f5qey7SHGhavBFNSPtNlovAxq9RODnVEqINpJQ"
   *     }
   * @apiParam {String} name for mutant.
   * @apiParamExample {json} Request-Example:
   *
   * @apiSuccessExample {JSON} old-response-example:
   *
   * @apiSuccessExample {JSON} response-example:
   */
  Router.post('/', mutantController.isMutant);
  Router.get('/', mutantController.isMutant);
  logInfo(`/api/${config.apiVersion}/mutant`);
  app.use(`/api/${config.apiVersion}/mutant`, Router);
};
