var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    /* On recherche les 4 dernieres offres*/
    models.Offre.findAll({
        include: {model: models.Recruteur},
        order: [['dateEmission', 'DESC']],
        limit: 4
    }).then(function (offres) {
        dernieresoffres = offres;
        /* On recherche les 4 derniers cvs*/
        models.CV.findAll({
            include: [{model: models.Competence_CV},
                {model: models.Candidat},
                {model: models.Langue},
                {model: models.Centre_interet},
                {model: models.Experience_pro, include: [{model: models.Mission_CV}, {model: models.Contrat_type}]},
                {model: models.Formation}
            ],
            order: [['createdAt', 'DESC']],
            limit: 4
        }).then(function (cvs) {
            dernierscvs = cvs;
            res.render('index', {title: 'Bayjob', session: req.session, offres: dernieresoffres, cvs: dernierscvs});
        });
    });
});


module.exports = router;