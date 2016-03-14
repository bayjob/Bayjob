var models = require('../models');
var express = require('express');
var router = express.Router();

//Liste des mois pour l'affichage de la date
var mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

/* GET home page. */
router.get('/', function (req, res, next) {

    models.Notification.findAll({
        include: [{model: models.Utilisateur, include: models.Recruteur, where: {type: 'C'}},
            {model: models.CV, include:{model: models.Candidat, where: {UtilisateurId: req.session.user}}}],
        where : {choix: 1}
    }).then(function(notif){
        console.log(notif);
        res.render('notification', {title: 'Notification', notifications:notif, mois:mois});
    });

});

router.post('/accepterCV', function (req, res, next) {
    var notification = models.Notification.create({
        reponse: null,
        choix: 1,
        UtilisateurId: req.body.utilisateurSession,
        CVId: req.body.CVId,
        OffreId: req.body.listeOffresCV
    }).then(function () {
        res.redirect('/cv');
        next();
    });
});

router.post('/refuserCV', function (req, res, next) {
    var notification = models.Notification.create({
        reponse: null,
        choix: 0,
        UtilisateurId: req.body.utilisateurSession,
        CVId: req.body.CVId,
        OffreId: req.body.listeOffresCV
    }).then(function () {
        res.redirect('/cv');
        next();
    });
});

router.post('/accepterOffre', function (req, res, next) {
    var notification = models.Notification.create({
        reponse: null,
        choix: 1,
        UtilisateurId: req.body.utilisateurSession,
        CVId: req.body.listeCVsOffre,
        OffreId: req.body.OffreId
    }).then(function () {
        res.redirect('/offre');
        next();
    });
});

router.post('/refuserOffre', function (req, res, next) {
    var notification = models.Notification.create({
        reponse: null,
        choix: 0,
        UtilisateurId: req.body.utilisateurSession,
        CVId: req.body.listeCVsOffre,
        OffreId: req.body.OffreId
    }).then(function () {
        res.redirect('/offre');
        next();
    });
});

router.get('/accepterOffreNotif/:idOffre', function (req, res, next) {
    models.Notification.update({
        reponse: 1
    }, {
        where: {id: req.params.idOffre}
    }).then(function () {
        res.status(200);
        res.redirect('/espaceCandidat');
    });

});

router.get('/refuserOffreNotif/:idOffre', function (req, res, next) {
    models.Notification.update({
        reponse: 0
    }, {
        where: {id: req.params.idOffre}
    }).then(function () {
        res.status(200);
        res.redirect('/espaceCandidat');
    });
});

module.exports = router;