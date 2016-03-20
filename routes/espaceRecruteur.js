/**
 * Created by Soufiane on 15/03/2016.
 */

var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    if(req.session && req.session.user){
        //Récupération des offres de l'utilisateur connecté
        models.Recruteur.findOne({
            include : {model: models.Offre},
            where: {UtilisateurId: req.session.user}
        }).then(function(recruteur){
            //Liste des mois
            var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
            console.log(JSON.stringify(recruteur));
            res.render('espaceRecruteur', { title: 'Espace recruteur', recruteur: recruteur, mois : mois , session: req.session});
        });
    }else{
        res.redirect('/login');
    }
});

router.get('/deleteOffre/:idOffre', function(req, res, next) {
    models.Offre.destroy({ where: { id: req.params.idOffre }}).then(function(){
        res.redirect('/espaceRecruteur');
    });
});

module.exports = router;