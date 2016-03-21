/**
 * Created by Achraf on 26/02/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    models.Niveau_etude.findAll({
        attributes: ['id', 'intitule']
    }).then(function (niveau) {
        niveauEtude = niveau;

        res.render('rechercheCvs', {title: 'Recherche de CVs', messageErr: null, session: req.session});
    });
});


router.post('/', function (req, res) {
    console.log(req.body);

    //Critère pour le niveau d'etude
    if (req.body.nivEtude) {
        var niv_etude = {id: req.body.nivEtude};
    } else {
        var niv_etude = null;
    }
    if (req.body.competence) {
        var competences = req.body.competence;
    } else {
        var competence = null;
    }

    //Vérification s'il y a au moins un critère selectionné
    if (niv_etude == null && competences == null) {
        //Envoie d'un message d'avertissement : Veuillez selectionner au moins un critère
        res.render('rechercheCvs', {
            title: 'Recherche d\'Cvs',
            messageErr: "Veuillez selectionner au moins un critère",
            session: req.session
        });
    } else {

        var criteres_cv = {};

        //Construction de la requete de recherche

        criteres_cv.include = [{model: models.Niveau_etude, where: niv_etude}];
        if (competences != null) {

            criteres_cv.include.push({model: models.Competence_CV, where: competences});
        }

        //Execution de la requete de type SELECT
        models.CV.findAll(criteres_cv).then(function (Cvs) {
            //Liste des mois
            var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

            //Affichage de la page de resultats
            res.render('resultatRechercheCvs', {
                title: 'Résultat de recherche d\'Cvs',
                CV: Cvs,
                mois: mois,
                session: req.session
            });
            console.log(JSON.stringify(Cvs));
        });

    }

});

module.exports = router;
