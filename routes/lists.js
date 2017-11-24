var express = require('express');
var router = express.Router();
const uuid = require('uuid/v4');
var lists = require('../data/lists');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(lists);
});

router.post('/', function (req, res) {
  console.log(req.body);
  var temp = {
    uuid:uuid(),
    name:req.body.name
  };
  lists.push(temp);
  res.writeHead(200);
  res.end('ok');
});

module.exports = router;
