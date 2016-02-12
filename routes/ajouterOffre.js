/**
 * Created by Soufiane on 09/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ajouterOffre', { title: 'Inscription' });
});

router.post('/', function(req, res, next) {

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

    if(handicap == "on") {

        handicapBool = true;
    } else {


        handicapBool = false;

    }

    var offre = models.Offre.build({
        titre : titre,
        xpRequise : xpRequise,
        resume : resume,
        tempDeTravail : tempDeTravail,
        salaire : salaire,
        ville : ville,
        dateEmission : dateEmission,
        handicap : handicapBool,
        mail : mail
        // get idUser from session
        // get type contrat ID
        // get niveau etude ID
    });

    offre.save().then(function() {
        res.send('ok added : ' + offre.titre);
        console.log(offre.handicap);
        console.log(handicapBool);
    })
});

module.exports = router;