/**
 * Created by Antoine Lecoustre on 27/02/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session && req.session.user) {
        var notifications;
        //Récupération des offres de l'utilisateur connecté
        models.Candidat.findOne({
            include: [{model: models.CV, include: {model: models.Notification}}],
            where: {UtilisateurId: req.session.user}
        }).then(function (candidat) {
            //Liste des mois
            var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            console.log(JSON.stringify(candidat));
            res.render('espaceCandidat', {
                title: 'Espace candidat',
                candidat: candidat,
                mois: mois,
                session: req.session
            });
        });


    } else {
        res.redirect('/login');
    }


});

router.post('/', function(req, res, next) {
    var test =  JSON.stringify(req.body);
    var i =0;
    var taille =req.body.tailleCV;
    console.log(test.match(/varCVid[0-9][0-9]/g));
    var expression = /varCVid[0-9][0-9]/g;
    var body = JSON.stringify(req.body);
    var resultat;
    while ((resultat = expression.exec(body)) !== null) {
        var resultatdecompo = resultat[0];
        var id = resultatdecompo.split("id");
        console.log(id[1]);
        models.CV.findOne({
            attributes: ['id'],
            where: {id: id[1]},
        }).then(function (cv) {
            cv.destroy();
        });
    }
    res.redirect('/espaceCandidat');
});

module.exports = router;