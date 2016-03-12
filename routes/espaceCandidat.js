/**
 * Created by Antoine Lecoustre on 27/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session && req.session.user){
    var notifications;

    //Récupération des notifications de l'utilisateur
    models.Notification.findAll({
      include: [{model: models.Utilisateur, include: models.Recruteur},
        {model: models.CV, include:{model: models.Candidat, where: {UtilisateurId: req.session.user}}}]
      //where : {UtilisateurId: req.session.user}
    }).then(function(notif){
      notifications = notif;
    });

    //Récupération des offres de l'utilisateur connecté
    models.Candidat.findOne({
      include : [{model: models.CV, include : {model: models.Notification}}],
      where: {UtilisateurId: req.session.user}
    }).then(function(candidat){
      //Liste des mois
      var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
      console.log(JSON.stringify(notifications));
      res.render('espaceCandidat', { title: 'Espace candidat', candidat: candidat, mois:mois, session: req.session, notifications:notifications});
    });
  }else{
    res.redirect('/login');
  }



});

module.exports = router;