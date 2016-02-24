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
  res.render('login', {title: 'Connexion',email:null,mdp:null});
  //req.session.test = "blablabla";
});

/* Action ex�cut�e lorsque l'utilisateur se connecte */
router.post('/', function (req, res) {
  models.Utilisateur.findOne({
    where:{mail: req.body.email}
  }).then(function(utilisateur) {
    if(utilisateur && req.body.email === utilisateur.mail && req.body.mdp === utilisateur.mdp){
      req.session.user = utilisateur.id;
      req.session.type = utilisateur.type;

      //TEST
      console.log(crypto.createHash('md5').update(utilisateur.mdp).digest("hex"));
      res.send("login success!");
    }else{
      res.send('login failed');
    }
  });

});
module.exports = router;