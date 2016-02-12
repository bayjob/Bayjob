/**
 * Created by Soufiane on 05/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ajouterRecruteur', { title: 'Inscription' });
});

router.post('/', function(req, res, next) {

    var recruteur = models.Recruteur.build({

        nomRecruteur : req.body.nomRecruteur,
        prenomRecruteur : req.body.prenomRecruteur,
        nomEntreprise : req.body.nomEntreprise,
        adresse : req.body.adresse,
        ville : req.body.ville,
        cp : req.body.cp,
        pays : req.body.pays,
        telFixe : req.body.telFixe,
        telMobile : req.body.telMobile,
        mail : req.body.mail,
        mdp : req.body.mdp
    });

    recruteur.save().then(function() {
        res.send('ok added : ' + recruteur.nomRecruteur);
    })
});
module.exports = router;