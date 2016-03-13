var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/accepterCV', function(req, res, next) {
  var notification = models.Notification.build({
    reponse:null,
    choix:1
  });

  notification.save().then(function() {
    notification.setUtilisateur(req.body.utilisateurSession);
    notification.setCV(req.body.CVId);
    notification.setOffre(req.body.OffreId);

    res.send('ok');
  });
});

router.post('/refuserCV', function(req, res, next) {
  var notification = models.Notification.build({
    reponse:null,
    choix:0
  });

  notification.save().then(function() {
    notification.setUtilisateur(req.body.utilisateurSession);
    notification.setCV(req.body.CVId);

    res.send('ok');
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