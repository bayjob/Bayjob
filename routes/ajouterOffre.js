/**
 * Created by Soufiane on 09/02/2016.
 */
var models = require('../models');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var sess;

router.get('/', function (req, res, next) {

    var NiveauEtude;
    var Departement;

    models.Departement.findAll({

        attributes: ['id', 'intitule']

    }).then(function (departement) {
        Departement = departement;
    });

    models.Niveau_etude.findAll({

        attributes: ['id', 'intitule']

    }).then(function (NE) {
        NiveauEtude = NE;
    });

    models.Contrat_type.findAll({

        attributes: ['id', 'intitule']

    }).then(function (contrat) {

        res.render('ajouterOffre', {
            title: 'Ajoutez votre offre',
            contrat: contrat,
            NiveauEtud: NiveauEtude,
            Departement: Departement
        });
    });

});

router.post('/', function (req, res, next) {

// Recuperation de l'identifiant du recruteur � partir de la session

    var recId;
    sess = req.session;
    models.Recruteur.findOne({

        where: {mail: sess.user}

    }).then(function (rec) {

        recId = rec;
        console.log(recId);
    });

    // R�cup�ration des donn�es envoy�es via le formulaire

    var handicapBool = true;
    var titre = req.body.titre;
    var xpRequise = req.body.xpRequise;
    var tempDeTravail = req.body.tempDeTravail;
    var resume = req.body.resume;
    var salaire = req.body.salaire;
    var ville = req.body.ville;
    var dateEmission = req.body.dateEmission;
    var handicap = req.body.handicap;
    var mail = req.body.mail;
    var contrat = req.body.contrat;
    var NE = req.body.niveau;
    var dep = req.body.departement;


    if (handicap == "on") {
        handicapBool = true;
    } else {
        handicapBool = false;
    }

    // Cr�ation de l'offre

    var offre = models.Offre.build({

        titre: titre,
        xpRequise: xpRequise,
        resume: resume,
        tempDeTravail: tempDeTravail,
        salaire: salaire,
        ville: ville,
        dateEmission: dateEmission,
        handicap: handicapBool,
        mail: mail,
        ContratTypeId: contrat,
        NiveauEtudeId: NE,
        DepartementId: dep

    });

    // Insertion de l'offre

    offre.save().then(function () {

        offre.setRecruteur(recId);
        res.send('ok added : ' + offre.titre + "  " + contrat);
        console.log("apr�s : " + recId);
    })
});

module.exports = router;