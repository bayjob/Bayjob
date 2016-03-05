/**
 * Created by Antoine Lecoustre on 08/02/2016.
 */
var models  = require('../models');
var express = require('express');
var session = require('express-session');
var crypto = require('crypto');
var router = express.Router();

var sess;
/* GET users listing. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;