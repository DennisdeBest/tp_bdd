var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4');
var lists = require('../data/lists');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(lists);
});

router.get('/:uuid', function(req, res) {
  let uuid = req.params.uuid;
  let code = 404;
  let response = 'specified uuid not found';
  lists.map((list) => {
    if(list.uuid === uuid){
      code = 200;
      response = list.items;
    }
  });

  res.send(response);
});

router.post('/', function (req, res) {
  var temp = {
    uuid:uuid(),
    name:req.body.name
  };
  lists.push(temp);
  res.status(200);
  res.send(temp);
});

router.post('/:name', function (req, res) {
  const temp = {
    uuid:uuid(),
    name:req.body.name
  };
  let code = 404;
  let response = 'specified uuid not found';
  lists.map((list, index) => {
    if(list.name === req.params.name){
      list.items.push(temp);
      code = 200;
      response = temp;
    }
  });
  res.status(code);
  res.send(response);
});

router.delete('/:uuid', function (req, res) {
  let uuid = req.params.uuid;
  let code = 404;
  let response = 'specified uuid not found';
  lists.map((list, index) => {
    if(list.uuid === uuid){
      lists.slice(index, 1);
      code = 200;
      response = 'ok';
    }
  });

  res.status(code);
  res.send(response);
});

module.exports = router;
