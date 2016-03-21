/**
 * Created by Soufiane on 05/03/2016.
 */
var models = require('../models');
var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var ErroHandler;

/*
 * ErrorHandler : Variable globale prenant 0 lors du premier chargement de la page
 * ou bien 1 lors du chargement de la page en cas d'erreur
 * de coordonéés de connexion ( Email existe déjà ou erreur de confirmation de l'email ou du mdp)
 * * */

router.get('/', function (req, res, next) {

    ErroHandler = 0;
    var Pays;
    var Departements;
    var Recruteur;
    var Utilisateur;
    var paysIntitule;
    var depIntitule;

    models.Recruteur.findOne({
        include: {model: models.Offre},
        where: {UtilisateurId: req.session.user}

    }).then(function (recruteur) {

        // Objet recruteur selectionné à partir de la base de données (where id = id dans session)
        Recruteur = recruteur;

        models.Pays.findAll({
            attributes: ['id', 'intitule']
        }).then(function (pays) {

            // liste des pays à partir de la table pays
            Pays = pays;

            models.Departement.findAll({
                attributes: ['id', 'intitule']
            }).then(function (departement) {

                // liste des departement
                Departements = departement;

                models.Pays.findOne({
                    attributes: ['id', 'intitule']
                }).then(function (paysint) {

                    // pays du recruteur selectionné à partir de la base de données
                    paysIntitule = paysint;

                    models.Departement.findOne({
                        attributes: ['id', 'intitule']
                    }).then(function (depint) {
                        // departement du recruteur selectionné à partir de la base de données (cas de pays = france)
                        depIntitule = depint;

                        models.Utilisateur.findOne({
                            where: {id: req.session.user}
                        }).then(function (utilisateur) {

                            // Objet recruteur selectionné à partir de la base de données (where id = id dans session)

                            Utilisateur = utilisateur;
                            res.render('modifierRecruteur',
                                {

                                    // information retournées via le formulaire dans la page : modifierRecruteur
                                    title: 'Inscription',
                                    nomRecruteur: Recruteur.nomRecruteur,
                                    prenomRecruteur: Recruteur.prenomRecruteur,
                                    nomEntreprise: Recruteur.nomEntreprise,
                                    adresse: Recruteur.adresse,
                                    ville: Recruteur.ville,
                                    cp: Recruteur.cp,
                                    telFixe: Recruteur.telFixe,
                                    telMobile: Recruteur.telMobile,
                                    mail: Utilisateur.mail,
                                    mdp: Utilisateur.mdp,
                                    pays: Pays,
                                    departement: Departements,
                                    departementid: Recruteur.DepartementId,
                                    departementintitule: depIntitule,
                                    paysid: Recruteur.PayId,
                                    paysintitule: paysIntitule,
                                    ErroHandler: ErroHandler,
                                    Err: null,
                                    session: req.session

                                });
                        });
                    });
                });
            });
        });
    });
});

router.post('/', function (req, res, next) {

    ErroHandler = 1;

    var nomRecruteur = req.body.nomRecruteur;
    var prenomRecruteur = req.body.prenomRecruteur;
    var nomEntreprise = req.body.nomEntreprise;
    var adresse = req.body.adresse;
    var ville = req.body.ville;
    var cp = req.body.cp;
    var pays = req.body.pays;
    var telFixe = req.body.telFixe;
    var telMobile = req.body.telMobile;
    var mail = req.body.mail;
    var retapEmail = req.body.retapEmail;
    var mdp = req.body.mdp;
    var retapMdp = req.body.retapMdp;
    var dep = req.body.dep;
    var paysHandleError;
    var Departement;

    // erreur de confirmation de coordonnée
    var err = null;


// different type d'erreur de confirmation de coordonées de connexion
    if (mail == retapEmail && mdp == retapMdp) {
        err = 0;
    } else if (mail == retapEmail && mdp != retapMdp) {
        err = 1;
    } else if (mail != retapEmail && mdp == retapMdp) {
        err = 2;
    } else if (mail != retapEmail && mdp != retapMdp) {
        err = 3;
    }
    // Modification de l'objet recruteur

    if (err == 0) {

        var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        // Modification de l'utilisateur en cas de modification des coordonées de connexions ( email et mdp )
        models.Utilisateur.update(
            {
                mail: mail,
                mdp: crypto.createHash('md5').update(req.body.mdp).digest("hex"),
                type: "R"
            },

            {
                where: {
                    id: req.session.user
                }
            });

        // Modification des coordonnées du recruteur
        models.Recruteur.update(
            {
                nomRecruteur: nomRecruteur,
                prenomRecruteur: prenomRecruteur,
                nomEntreprise: nomEntreprise,
                adresse: adresse,
                ville: ville,
                cp: cp,
                telFixe: telFixe,
                telMobile: telMobile,
                mail: mail,
                mdp: mdp,
                departementId: dep,
                paysId: pays
            },

            {
                where: {
                    UtilisateurId: req.session.user
                }

            }).then(function (recruteur) {

            models.Recruteur.findOne({
                include: {model: models.Offre},
                where: {UtilisateurId: req.session.user}
            }).then(function (recruteur) {

                res.render('espaceRecruteur', {
                    title: 'Espace recruteur',
                    recruteur: recruteur,
                    mois: mois,
                    session: req.session
                });
            });

        });


    }

    // pour chaque erreur renvoyer les informations saisie avant l'erreur + les champs correspondants à l'erreur en warning
    // remarque : pour les champs de type select (Pays et departements)on ne renvoie que les valaeur
    // saisies avant l'erreur au lieu de tout renvoyer ( gerée avec la variable ErrorHandler dans le fichier ejs)

    else if (err == 1) {

        console.log(err);
        models.Pays.findOne({
            attributes: ['id', 'intitule'],
            where: {id: pays}
        }).then(function (Pays) {
            paysHandleError = Pays;
            models.Departement.findOne({
                attributes: ['id', 'intitule'],
                where: {id: dep}
            }).then(function (departement) {
                Departement = departement;
                res.render('modifierRecruteur', {

                    title: 'Inscription',
                    ErroHandler: ErroHandler,
                    nomRecruteur: nomRecruteur,
                    prenomRecruteur: prenomRecruteur,
                    nomEntreprise: nomEntreprise,
                    adresse: adresse,
                    ville: ville,
                    cp: cp,
                    pays: paysHandleError,
                    departement: Departement,
                    telFixe: telFixe,
                    telMobile: telMobile,
                    mail: mail,
                    mdp: null,
                    Err: 1,
                    session: req.session
                });
            });
        });

    } else if (err == 2) {

        console.log(err);
        models.Pays.findOne({
            attributes: ['id', 'intitule'],
            where: {id: pays}
        }).then(function (Pays) {
            paysHandleError = Pays;
            models.Departement.findOne({
                attributes: ['id', 'intitule'],
                where: {id: dep}
            }).then(function (departement) {
                Departement = departement;
                res.render('modifierRecruteur', {

                    title: 'Inscription',
                    ErroHandler: ErroHandler,
                    nomRecruteur: nomRecruteur,
                    prenomRecruteur: prenomRecruteur,
                    nomEntreprise: nomEntreprise,
                    adresse: adresse,
                    ville: ville,
                    cp: cp,
                    pays: paysHandleError,
                    departement: Departement,
                    telFixe: telFixe,
                    telMobile: telMobile,
                    mail: null,
                    mdp: mdp,
                    Err: 2,
                    session: req.session
                });
            });
        });


    } else if (err == 3) {

        console.log(err);

        console.log(err);
        models.Pays.findOne({
            attributes: ['id', 'intitule'],
            where: {id: pays}
        }).then(function (Pays) {
            paysHandleError = Pays;
            models.Departement.findOne({
                attributes: ['id', 'intitule'],
                where: {id: dep}
            }).then(function (departement) {
                Departement = departement;
                res.render('modifierRecruteur', {

                    title: 'Inscription',
                    ErroHandler: ErroHandler,
                    nomRecruteur: nomRecruteur,
                    prenomRecruteur: prenomRecruteur,
                    nomEntreprise: nomEntreprise,
                    adresse: adresse,
                    ville: ville,
                    cp: cp,
                    departement: Departement,
                    telFixe: telFixe,
                    telMobile: telMobile,
                    mail: null,
                    mdp: null,
                    Err: 3,
                    session: req.session
                });
            });
        });
    }
});
module.exports = router;