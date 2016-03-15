var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Offre.findAll({
    include : {model: models.Recruteur},
      order: [['dateEmission', 'DESC']],
      limit: 4
  }).then(function(offres){
    dernieresoffres = offres;
      models.CV.findAll({
          include:[{model: models.Competence_CV},
              {model: models.Candidat},
              {model: models.Langue},
              {model: models.Centre_interet},
              {model: models.Experience_pro, include : [{model: models.Mission_CV}, {model: models.Contrat_type}]},
              {model: models.Formation}
          ],
          order: [['createdAt', 'DESC']],
          limit: 4
      }).then(function(cvs){
          dernierscvs = cvs;
          res.render('index', { title: 'Bayjob', session: req.session, offres:dernieresoffres, cvs:dernierscvs});
      });
  });
});

router.get('/test', function(req, res) {
  models.Candidat.create({
    nom: 'lecoustre',
    prenom: 'antoine',
    mail: 'a.lecoustre@gmail.com',
    telFixe:'0328687456',
    telMobile:'0684666115',
    mdp:'toto',
    cp: '59492',
    ville:'hoymille',
    pays:'France',
    mobilite:'Permis B'
  }).then(function() {
    res.redirect('/');
  });

  models.Recruteur.create({
    nomRecruteur: 'Dupont Robert',
    prenomRecruteur: 'Robert',
    nomEntreprise: 'GFI',
    adresse: '17 Rue Edouard Delesalle',
    ville: 'Lille',
    cp: '59800',
    pays:'France',
    mail: 'test@gfi.fr',
    telFixe: '0320999999',
    telMobile: '0620999999',
    mdp: 'toto'
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;