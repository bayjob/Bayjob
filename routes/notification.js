var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/accepterCV', function(req, res, next) {
  var notification = models.Notification.build({
    utilisateurSession:req.body.utilisateurSession,
    reponse:0,
    choix:1
  });

  notification.save().then(function() {
    notification.setCV(req.body.CVId);
    notification.setOffre(req.body.OffreId);
  });
});

router.post('/refuserCV', function(req, res, next) {
  var notification = models.Notification.build({
    utilisateurSession:req.body.utilisateurSession,
    reponse:0,
    choix:0
  });

  notification.save().then(function() {
    notification.setCV(req.body.CVId);
  });
});

module.exports = router;