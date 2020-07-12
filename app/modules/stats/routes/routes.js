const express = require('express');
const config = require('../../../../config/config')();
const Router = new express.Router();
const statController = require('../controler/statsController');

module.exports = function statRoutes(app) {
  /**
   * @api {post} /api/v1/stats GET
   * @apiName CreateAgreement
   * @apiGroup stat
   * @apiDescription Create a stat into the database
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTBhMTZjNGQ3MGFhZTViN2VjYjFkYmMiLCJleHBpcmVzSW4iOjYzMDcyMDAwLCJpYXQiOjE0OTM4MzM1MzB9.A2j14f5qey7SHGhavBFNSPtNlovAxq9RODnVEqINpJQ"
   *     }
   * @apiParam {String} name for stat.
   * @apiParamExample {json} Request-Example:
   *
   * @apiSuccessExample {JSON} old-response-example:
   *
   * @apiSuccessExample {JSON} response-example:
   */
  Router.get('/', statController.stats);
  logInfo(`/api/${config.apiVersion}/stats`);
  app.use(`/api/${config.apiVersion}/stats`, Router);
};
