/* eslint-disable no-undef,no-unused-vars */
const requestTest = require('supertest');
const app = require('../../../init/app');
const mutantModel = require('../../mutant/model/mutant');
describe('Get Stats multiple data', () => {
  let countMutant = 0;
  let countHuman = 0;
  let ratio = 0;
  beforeEach(async () => {
    let valRandom = {0: true, 1: false};
    let promise = [];
    for (let i of [...Array(1000).keys()]) {
      promise = [...promise, mutantModel.create({dna: [], isMutant: valRandom[Math.floor(Math.random() * 2)]})];
    }
    await Promise.all(promise);
    countMutant = await mutantModel.find({isMutant: true}).count();
    countHuman = await mutantModel.find({isMutant: false}).count();
    ratio = countHuman === 0 ? countMutant : countMutant / countHuman;
  });
  test('Returns stats', async () => {
    const res = await requestTest(app).get('/api/v1/stats');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'count_mutant_dna': countMutant,
      'count_human_dna': countHuman,
      ratio: ratio > 0 ? ratio.toFixed(2) : ratio
    });
  });
});

describe('Get Stats Empty data', () => {
  let countMutant = 0;
  let countHuman = 0;
  let ratio = 0;
  beforeEach(async () => {
    await mutantModel.deleteMany();
    countMutant = await mutantModel.find({isMutant: true}).count();
    countHuman = await mutantModel.find({isMutant: false}).count();
    ratio = countHuman === 0 ? countMutant : countMutant / countHuman;
  });
  test('Returns stats', async () => {
    const res = await requestTest(app).get('/api/v1/stats');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      'count_mutant_dna': countMutant,
      'count_human_dna': countHuman,
      ratio: ratio > 0 ? ratio.toFixed(2) : ratio
    });
  });
});
