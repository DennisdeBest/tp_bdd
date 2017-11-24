require('chai').should();
const request = require('supertest');
const app = require('../app');
var lists = [];
const list = {
  name: 'test',
  uuid: '833f5874-a909-45a4-bd5c-9312cfd0d4c2',
  items: [
    {
      name: 'item1',
      uuid: '833f5874-a909-45a4-bd5c-9312cfd0d4c2'
    },
    {
      name: 'item2',
      uuid: '833f5874-a909-45a4-bd5c-9312cfd0d4c2'
    },
  ]
}


describe('lists', () => {

  beforeEach(() => {
    lists = [];
    lists.push(list);
  });

  afterEach(() => {
    lists = [];
  });

  describe('generate Uuid', () => {
    it('should have a uuid', () => {
      lists.map((list) => {
        list.should.have.property('uuid');
      })
    })
  });

  describe('post action', () => {
    it('should be able to create a new list', () => {
      return request(app)
        .post('/lists')
        .send({name: 'autotest'})
        .then((res) => {
          res.status.should.equal(200)
        });
    });
    it('should be able to create a new article in list', () => {
      return request(app)
        .post('/lists/test')
        .send({name: 'item3'})
        .then((res) => {
          res.status.should.equal(200)
        });
    })
  });

  describe('get action', () => {
    it('should contain previously posted data', () => {
      return request(app)
        .get('/lists')
        .then((res) => {
          res.status.should.equal(200)
        });
    });
    it('should get items from specified list', () => {
      return request(app)
        .get('/lists/833f5874-a909-45a4-bd5c-9312cfd0d4c2')
        .then((res) => {
          res.status.should.equal(200)
        });
    })
  });

  describe('delete action', () => {
    it('Should delete by uuid', () => {
      return request(app)
        .del('/lists/833f5874-a909-45a4-bd5c-9312cfd0d4c2')
        .then((res) => {
          res.status.should.equal(200)
        })
    });
    it('Should return error if uuid doesn\'t exists', () => {
      return request(app)
        .del('/lists/833f58dfdsfkek74-a909-45a4-bd5c-931fd0d4c2')
        .then((res) => {
          res.status.should.equal(404)
        })
    })
  })
});