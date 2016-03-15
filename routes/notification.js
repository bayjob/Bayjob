var models = require('../models');
var express = require('express');
var router = express.Router();

//Liste des mois pour l'affichage de la date
var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

/* GET home page. */
router.get('/', function (req, res, next) {

    if (req.session && req.session.user) {
        //Requête à exécuter quand le candidat est connecté
        if (req.session.type == 'C') {
            models.Notification.findAll({
                include: [{
                    model: models.CV,
                    include: {
                        model: models.Candidat,
                        include: {model: models.Utilisateur, where: {id: req.session.user}}
                    }
                },
                    {model: models.Utilisateur, include: {model: models.Recruteur}, where: {type: 'R'}},
                    {model: models.Offre}]
            }).then(function (notif) {
                console.log(JSON.stringify(notif));
                res.render('notification', {
                    title: 'Notification',
                    notifications: notif,
                    mois: mois,
                    session: req.session
                });
            });
        } else {
            //Requête à exécuter quand le recruteur est connecté
            models.Notification.findAll({
                include: [{
                    model: models.Offre,
                    include: {
                        model: models.Recruteur,
                        include: {model: models.Utilisateur, where: {id: req.session.user}}
                    }
                },
                    {model: models.Utilisateur, include: {model: models.Candidat}, where: {type: 'C'}},
                    {model: models.CV}]
            }).then(function (notif) {
                console.log(JSON.stringify(notif));
                res.render('notification', {
                    title: 'Notification',
                    notifications: notif,
                    mois: mois,
                    session: req.session
                });
            });
        }
    } else {
        res.redirect('/login');
    }


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

router.get('/accepterNotif/:idNotif', function (req, res, next) {
    models.Notification.update({
        reponse: 1
    }, {
        where: {id: req.params.idNotif}
    }).then(function () {
        res.status(200);
        res.redirect('/notification');
    });

});

router.get('/refuserNotif/:idNotif', function (req, res, next) {
    models.Notification.update({
        reponse: 0
    }, {
        where: {id: req.params.idNotif}
    }).then(function () {
        res.status(200);
        res.redirect('/notification');
    });
});

module.exports = router;