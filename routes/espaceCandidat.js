/**
 * Created by Antoine Lecoustre on 27/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session && req.session.user){
    //Récupération des offres de l'utilisateur connecté
    models.Candidat.findOne({
      include : {model: models.CV},
      where: {UtilisateurId: req.session.user}
    }).then(function(candidat){
      //Liste des mois
      var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
      console.log(JSON.stringify(candidat));
      res.render('espaceCandidat', { title: 'Espace candidat', candidat: candidat, mois:mois, session: req.session});
    });
  }else{
    res.redirect('/login');
  }



});

module.exports = router;