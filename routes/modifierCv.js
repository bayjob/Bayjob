/**
 * Created by Antoine Delahaye on 24/02/2016.
 */

var models  = require('../models');
var express = require('express');
var router = express.Router();
//Liste des mois
var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

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
        res.render('modifierCv', { title: 'Modification du CV', cv: cv, mois: mois, session: req.session, cvid: cv.id});
    });
});


router.post('/', function (req, res) {
    models.CV.findOne( {
        where:{id: req.body.cvid},
        include:[{model: models.Competence_CV},
            {model: models.Candidat},
            {model: models.Langue},
            {model: models.Centre_interet},
            {model: models.Experience_pro, include : [{model: models.Mission_CV}, {model: models.Contrat_type}]},
            {model: models.Formation}
        ]
    }).then(function(cv) {
        if (req.body.oldresume != req.body.resumeCv){
            cv.update({
                resume: req.body.resumeCv
            })
        }
    });
    var id = req.body.idformation;
    console.log(id + "|||||||");
    models.Formation.findOne( {
        where:{cvId: req.body.cvid, id:req.body.idformation},
        include:[{model: models.CV}]
        }).then(function(formation) {
        if (req.body.oldanneeFormation != req.body.anneeFormation){
            console.log("TEST avant");
            formation.update({
                annee: parseInt(req.body.anneeFormation)
            })
            console.log("TEST APRES");
        }
    });
});




module.exports = router;
