require('chai').should();
const request = require('supertest');
const app = require('../app');
var lists = require('../data/lists');


describe('lists', () => {
  describe('generate Uuid', () => {
    it('should have a uuid', () => {
      lists.map((list) => {
        list.should.have.property('uuid');
      })
    })
  });

  describe('post action', () => {
    it('should be successful', () => {
      return request(app)
        .post('/lists')
        .send({ name: 'autotest' })
        .then((res) => {
        res.status.should.equal(200)
        });
    })
  });

  /*describe('get action', () => {
    it('should contain previously posted data', () => {
      return request(app)
        .get('/lists')
        .then((res) => {
        res.body.
        });

    })
  })*/
});