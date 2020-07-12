/* eslint-disable no-undef */
const requestTest = require('supertest');
const app = require('../../../init/app');
const mutantModel = require('../model/mutant');
describe('IsMutant', () => {

  beforeEach(async () => {
    await mutantModel.deleteMany();
  });
  test('Returns true when it finds 4 characters in a row in any of the addresses', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG']});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({isMutant: true});
  });
  test('Returns true when it finds 4 characters in a row in any of the addresses (large matrix) (568 X 568)', async () => {
    let data = 'TGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCAAAAATGCATGCATGCATGCAT';
    let matrix = [...Array(data.length).keys()].map(() => data);
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: matrix});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({isMutant: true});
  });
  test('Returns true when it finds 4 characters horizontal', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['AAAATG', 'CGGTGC', 'TTATAT', 'AGAAGG', 'CGCCTA', 'TCACTG']});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({isMutant: true});
  });
  test('Returns true when it finds 4 characters vertical', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ATAATG', 'CGGAGC', 'TTAAAT', 'AGAAGG', 'CGCCTA', 'TCACTG']});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({isMutant: true});
  });
  test('Returns true when it finds 4 characters diagonal left', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ATGCA', 'CACTG', 'TCGTT', 'CGAAC', 'CGAAC']});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({isMutant: true});
  });
  test('Returns true when it finds 4 characters diagonal right', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ATGGA', 'CACTG', 'TCATT', 'CGAAC', 'CGAAC']});
    expect(res.status).toBe(200);
    expect(res.body).toEqual({isMutant: true});
  });
  test('Returns false in case it does not meet any condition', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ATGCGA', 'CGGTGC', 'TTATAT', 'AGAAGG', 'CGCCTA', 'TCACTG']});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({isMutant: false});
  });
  test('Return 403 if it\'s not an nXn Matrix', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ACGT', 'ACGT', 'AGT', 'ACGT']});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'Invalid DNA chain',
      attributes: {}
    });
  });
  test('Return 403 If it is a empty Matrix', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: []});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'Invalid DNA chain',
      attributes: {}
    });
  });
  test('Return 403 If it is a 3x3 or less', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['ACG', 'ACT', 'AGT']});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'Invalid DNA chain',
      attributes: {}
    });
  });
  test('Return 403 If it is a 4x1 or less', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant')
    .send({dna: ['A', 'C', 'T', 'C']});
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'Invalid DNA chain',
      attributes: {}
    });
  });
  test('Return 403 If it is a empty Matrix', async () => {
    const res = await requestTest(app)
    .post('/api/v1/mutant');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      statusCode: 403,
      error: 'Forbidden',
      message: 'Invalid DNA chain',
      attributes: {}
    });
  });
});
