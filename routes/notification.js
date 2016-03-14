var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/accepterCV', function(req, res, next) {
  var notification = models.Notification.create({
    reponse:null,
    choix:1,
    UtilisateurId:req.body.utilisateurSession,
    CVId:req.body.CVId,
    OffreId:req.body.listeOffresCV
  }).then(function() {
    res.redirect('/cv');
    next();
  });
});

router.post('/refuserCV', function(req, res, next) {
  var notification = models.Notification.create({
    reponse:null,
    choix:0,
    UtilisateurId:req.body.utilisateurSession,
    CVId:req.body.CVId,
    OffreId:req.body.listeOffresCV
  }).then(function() {
    res.redirect('/cv');
    next();
  });
});

router.get('/accepterOffreNotif/:idOffre', function(req, res, next) {
  models.Notification.update({
    reponse:1
  },{
    where:{id:req.params.idOffre}
  }).then(function(){
    res.status(200);
    res.redirect('/espaceCandidat');
  });

});

router.get('/refuserOffreNotif/:idOffre', function(req, res, next) {
  models.Notification.update({
    reponse:0
  },{
    where:{id:req.params.idOffre}
  }).then(function(){
    res.status(200);
    res.redirect('/espaceCandidat');
  });

});

module.exports = router;