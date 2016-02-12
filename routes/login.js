/**
 * Created by Antoine Lecoustre on 08/02/2016.
 */
var models  = require('../models');
var express = require('express');
var session = require('express-session');
var router = express.Router();

var sess;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {title: 'Connexion'});
  //req.session.test = "blablabla";
});

/* Action exécutée lorsque l'utilisateur se connecte */
router.post('/', function (req, res) {
  /*models.Candidat.findOne({
    where:{mail: 'a.lecoustre@gmail.com'},
    attributes: ['id']
  }).then(function(candidat) {
    //res.send(candidat.id);
    console.log(candidat);
  });*/

    console.log(checkExistCandidat());
    res.render('login', {title: 'Connexion'});

});

function checkExistCandidat(){
  models.Candidat.count({
    where:{mail: 'a.lecoustre@gmail.com'}
  }).then(function(result){
    if(result > 0){
      return "vrai";
    }else{
      return "faux";
    }
  });
};

var checkPasswordCandidat = function(){

};

module.exports = router;