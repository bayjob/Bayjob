/**
 * Created by Antoine Lecoustre on 09/02/2016.
 */
var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('rechercherOffres', { title: 'Recherche d\'offres', messageErr:null });
});

/* Action exécutée lorsque l'utilisateur lance la recherche d'une offre */
router.post('/', function (req, res) {
    console.log(req.body);

    var intitule_poste = null;

    var ville = null;
    var departement = null;
    var region = null;

    var niv_etude = null;
    var handicap = null;

    //Critère pour l'intitulé du poste
    if(req.body.intitulePoste){
        intitule_poste = {titre: req.body.intitulePoste};
    }

    //Critère pour la ville, region et département
    if(req.body.ville){
        ville = {ville: req.body.ville};
    }else if(req.body.departement){
        departement = {intitule: req.body.departement};
    }else if(req.body.region){
        region = {intitule: req.body.region};
    }

    //Critère pour le niveau d'etude
    if(req.body.nivEtude){
        niv_etude = {intitule: req.body.nivEtude};
    }else{
        niv_etude = null;
    }

    //Critère pour les handicaps
    if(req.body.handicap){
        handicap = {handicap: 1}
    }

    //Vérification s'il y a au moins un critère selectionné
    if(intitule_poste == null && ville == null && departement == null && region == null && niv_etude == null && handicap == null){
        //Envoie d'un message d'avertissement : Veuillez selectionner au mois un critère
        res.render('rechercherOffres', { title: 'Recherche d\'offres', messageErr:"Veuillez selectionner au mois un critère" });
    }else{
        var criteres_offre = {};

        //Construction de la requete de recherche
        criteres_offre.include = [{model: models.Contrat_type},
            {model: models.Niveau_etude, where: niv_etude},
            {model: models.Recruteur},
            {model: models.Departement,where:departement, include:{model: models.Region, where: region}}];

        if(intitule_poste != null || ville != null || handicap != null){
            criteres_offre.where = [intitule_poste, ville, handicap];
        }

        //Execution de la requete de type SELECT
        models.Offre.findAll(criteres_offre).then(function(offres){
            //Liste des mois
            var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

            //Affichage de la page de resultats
            res.render('resultatRechercheOffre', {title: 'Résultat de recherche d\'offres', offres: offres, mois: mois });
            console.log(JSON.stringify(offres));
        });
    }

});

module.exports = router;
