const expect = require('chai').expect;
const request = require('supertest');

const APIService = require('../../src/service/APIService');

const id = 1;
const locationObj = {
    name: "Test",
    area_m2: 123
};

describe('Test APIService',()=>{
    it('ListarID', () => {
        //APIService.ListarID({type: 'id'},locationObj)
          //.get('/location')
          //.set('Accept', 'application/json')
          //.expect('Content-Type', /json/)
          //.expect(200, done);
      });
});
