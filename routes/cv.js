/**
 * Created by Antoine Lecoustre on 09/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:idCv', function(req, res, next) {

  models.CV.findOne({
    where:{id: req.params.idCv},
    include:[{model: models.Competence_CV},
              {model: models.Candidat},
              {model: models.Langue},
              {model: models.Centre_interet},
              {model: models.Experience_pro, include : [{model: models.Mission_CV}, {model: models.Contrat_type}]},
              {model: models.Formation}
              ]
  }).then(function(cv){
    console.log(JSON.stringify(cv));

    //Liste des mois pour l'affichage de la date
      var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    res.render('cv', { title: 'CV', cv: cv, mois: mois, session: req.session});
  });
});

module.exports = router;
