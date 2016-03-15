/**
 * Created by Antoine Lecoustre on 09/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

//Liste des mois pour l'affichage de la date
var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

router.get('/', function(req, res, next) {

    var cvsUser = [];

    var offreUtilisateurConnecte = null;

    //Récupération des offres de l'utilisateur connecté
    models.Offre.findAll({
        include : {model: models.Recruteur, where : {UtilisateurId: req.session.user}}
    }).then(function(offres){
        offreUtilisateurConnecte = offres;
    });

    models.Notification.findAll({
        attributes: ['CVId'],
        where: {UtilisateurId:req.session.user}
    }).then(function(notifUtilisateur){

        for(var i=0;i<notifUtilisateur.length;i++){
            cvsUser.push(notifUtilisateur[i].CVId);
        }

        console.log(cvsUser);

        if(cvsUser.length==0 && notifUtilisateur.length == 0){
            models.CV.findOne({
                attributes: ['id']
            }).then(function(cv){
                models.CV.findOne({
                    where:{id: cv.id},
                    include:[{model: models.Competence_CV},
                        {model: models.Candidat},
                        {model: models.Langue},
                        {model: models.Centre_interet},
                        {model: models.Experience_pro, include : [{model: models.Mission_CV}, {model: models.Contrat_type}]},
                        {model: models.Formation}
                    ]
                }).then(function(cv){
                    res.render('cv', { title: 'CV', cv: cv, mois: mois, session: req.session, offreUtilisateurConnecte: offreUtilisateurConnecte});
                });
            });
        }else if(cvsUser.length==0 && notifUtilisateur.length != 0){
            res.redirect('/espaceCandidat');
        }else{
            models.CV.findOne({
                attributes: ['id'],
                where: {id: {
                    $notIn: cvsUser
                }}
            }).then(function(cv){;
                models.CV.findOne({
                    where:{id: cv.id},
                    include:[{model: models.Competence_CV},
                        {model: models.Candidat},
                        {model: models.Langue},
                        {model: models.Centre_interet},
                        {model: models.Experience_pro, include : [{model: models.Mission_CV}, {model: models.Contrat_type}]},
                        {model: models.Formation}
                    ]
                }).then(function(cv){
                    res.render('cv', { title: 'CV', cv: cv, mois: mois, session: req.session, offreUtilisateurConnecte: offreUtilisateurConnecte});
                });
            });

        }
    });
});

/* GET home page. */
router.get('/:idCv', function(req, res, next) {
    var notifExist = 0;
    var offreUtilisateurConnecte = null;

    //Récupération des offres de l'utilisateur connecté
    models.Offre.findAll({
        include : {model: models.Recruteur, where : {UtilisateurId: req.session.user}}
    }).then(function(offres){
        offreUtilisateurConnecte = offres;
    });

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
        res.render('cv', { title: 'CV', cv: cv, mois: mois, session: req.session, offreUtilisateurConnecte: offreUtilisateurConnecte});
    });
});

module.exports = router;
