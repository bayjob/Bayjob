/**
 * Created by Achraf on 19/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var offresUser = [];

    var cvsUtilisateurConnecte = null;

    //Récupération des cv de l'utilisateur connecté
    models.CV.findAll({
        include: {model: models.Candidat, where: {UtilisateurId: req.session.user}}
    }).then(function (cvs) {
        cvsUtilisateurConnecte = cvs;
    });

    models.Notification.findAll({
        attributes: ['OffreId'],
        where: {UtilisateurId: req.session.user}
    }).then(function (notifUtilisateur) {

        for (var i = 0; i < notifUtilisateur.length; i++) {
            offresUser.push(notifUtilisateur[i].OffreId);
        }

        console.log("tab:" + offresUser);

        if (offresUser.length == 0 && notifUtilisateur.length == 0) {
            models.Offre.findOne({
                attributes: ['id']
            }).then(function (offre) {
                models.Offre.findOne({
                    where:{id: offre.id},
                    include:[
                        {model: models.Recruteur},
                        {model: models.Departement},
                        {model: models.Contrat_type},
                        {model: models.Niveau_etude},
                        {model: models.Mission_offre},
                        {model: models.Competence_offre}
                    ]
                }).then(function(offre){
                    console.log(JSON.stringify(offre));

                    //Liste des mois
                    var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
                    res.render('offre', { title: 'offre', offre: offre, mois: mois, session:req.session, cvsUtilisateurConnecte:cvsUtilisateurConnecte});
                });
            });
        } else if (offresUser.length == 0 && notifUtilisateur.length != 0) {
            res.redirect('/espaceRecruteur');
        } else {
            models.Offre.findOne({
                attributes: ['id'],
                where: {
                    id: {
                        $notIn: offresUser
                    }
                }
            }).then(function (offre) {
                models.Offre.findOne({
                    where:{id: offre.id},
                    include:[
                        {model: models.Recruteur},
                        {model: models.Departement},
                        {model: models.Contrat_type},
                        {model: models.Niveau_etude},
                        {model: models.Mission_offre},
                        {model: models.Competence_offre}
                    ]
                }).then(function(offre){
                    console.log(JSON.stringify(offre));

                    //Liste des mois
                    var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
                    res.render('offre', { title: 'offre', offre: offre, mois: mois, session:req.session, cvsUtilisateurConnecte:cvsUtilisateurConnecte});
                });
            });

        }
    });
});

/* GET home page. */
router.get('/:idOffres', function(req, res, next) {
    var cvsUtilisateurConnecte = null;

    //Récupération des cv de l'utilisateur connecté
    models.CV.findAll({
        include : {model: models.Candidat, where : {UtilisateurId: req.session.user}}
    }).then(function(cvs){
        cvsUtilisateurConnecte = cvs;
    });


    models.Offre.findOne({
        where:{id: req.params.idOffres},
        include:[
            {model: models.Recruteur},
            {model: models.Departement},
            {model: models.Contrat_type},
            {model: models.Niveau_etude},
            {model: models.Mission_offre},
            {model: models.Competence_offre}
        ]
    }).then(function(offre){
        console.log(JSON.stringify(offre));

        //Liste des mois
        var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
        res.render('offre', { title: 'offre', offre: offre, mois: mois, session:req.session, cvsUtilisateurConnecte:cvsUtilisateurConnecte});
    });


});

module.exports = router;

