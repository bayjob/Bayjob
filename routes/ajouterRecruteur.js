/**
 * Created by Soufiane on 05/02/2016.
 */
var models = require('../models');
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/*
 * ErrorHandler : Variable globale prenant 0 lors du premier chargement de la page
 * ou bien 1 lors du chargement de la page en cas d'erreur
 * de coordonéés de connexion ( Email existe déjà ou erreur de confirmation de l'email ou du mdp
 * * */
var ErroHandler;


router.get('/', function (req, res, next) {

    ErroHandler = 0;
    var Pays;

    models.Pays.findAll({
        attributes: ['id', 'intitule']
    }).then(function (pays) {
        Pays = pays;
        models.Departement.findAll({
            attributes: ['id', 'intitule']
        }).then(function (departement) {
            Departement = departement;

            res.render('ajouterRecruteur',
                {
                    title: 'Inscription d\'un recruteur',
                    departement: Departement,
                    pays: Pays,
                    ErroHandler: ErroHandler,
                    nomRecruteur: null,
                    prenomRecruteur: null,
                    nomEntreprise: null,
                    adresse: null,
                    ville: null,
                    cp: null,
                    telFixe: null,
                    telMobile: null,
                    mail: null,
                    mdp: null,
                    Err: null,
                    mailExist: null,
                    session: req.session
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
    var Departement;
    var paysHandleError;

    // erreur de confirmation de coordonnée
    var err = null;
    // erreur Email existant dans la base de données
    var mailExist = null;


    // Création de l'objet recruteur

    var recruteur = models.Recruteur.build({

        nomRecruteur: nomRecruteur,
        prenomRecruteur: prenomRecruteur,
        nomEntreprise: nomEntreprise,
        adresse: adresse,
        ville: ville,
        cp: cp,
        pays: pays,
        telFixe: telFixe,
        telMobile: telMobile,
        mail: mail,
        mdp: mdp,
        PayId: pays,
        DepartementId: dep,
        mailExist: null

    });
    // Retourne le pays selectionné ( renvoyé au formulaire dans le cas d'une erreur )
    models.Pays.findOne({
        attributes: ['id', 'intitule'],
        where: {id: pays}
    }).then(function (Pays) {
        paysHandleError = Pays;
    });
    // Retourne le departement selectionné ( renvoyé au formulaire dans le cas d'une erreur )

    models.Departement.findOne({
        attributes: ['id', 'intitule'],
        where: {id: dep}
    }).then(function (departement) {
        Departement = departement;
    });


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

// récuperer la liste des emails des recruteurs à partir de la base de données

    models.Utilisateur.findAll({
        attributes: ['mail'],
        where: {type: "R"}
    }).then(function (userList) {

        // Si l'email existe -> impossible de créer le compte + inviter l'utilisateur à saisir un autre email
        if (userList.length == 0) {
            mailExist = 0;
        } else {
            for (var i = 0; i < userList.length; i++) {

                if (userList[i].mail == mail) {

                    mailExist = 1;
                    break;

                } else {
                    mailExist = 0;
                }
            }
        }


        // Si l'Email n'existe pas et la confirmation de l'email et du mot de passe est correcte -> Créer le compte recruteur

        if (mailExist == 0) {
            if (err == 0) {
                var utilisateur = models.Utilisateur.build({
                    mail: mail,
                    mdp: crypto.createHash('md5').update(req.body.mdp).digest("hex"),
                    type: "R"
                });
            }

            // Gestion des erreurs de confirmation des emails et mots de passe

            else if (err == 1) {

                console.log(err);
                res.render('ajouterRecruteur', {

                    title: 'Inscription d\'un recruteur',
                    nomRecruteur: recruteur.nomRecruteur,
                    prenomRecruteur: recruteur.prenomRecruteur,
                    nomEntreprise: recruteur.nomEntreprise,
                    adresse: recruteur.adresse,
                    ville: recruteur.ville,
                    cp: recruteur.cp,
                    pays: paysHandleError,
                    departement: Departement,
                    telFixe: recruteur.telFixe,
                    telMobile: recruteur.telMobile,
                    mail: mail,
                    mdp: null,
                    Err: 1,
                    ErroHandler: ErroHandler,
                    mailExist: mailExist,
                    session: req.session
                });
            } else if (err == 2) {

                // confirmation de l'email incorrecte
                console.log(err);
                res.render('ajouterRecruteur', {

                    title: 'Inscription d\'un recruteur',
                    nomRecruteur: recruteur.nomRecruteur,
                    prenomRecruteur: recruteur.prenomRecruteur,
                    nomEntreprise: recruteur.nomEntreprise,
                    adresse: recruteur.adresse,
                    ville: recruteur.ville,
                    cp: recruteur.cp,
                    pays: paysHandleError,
                    departement: Departement,
                    telFixe: recruteur.telFixe,
                    telMobile: recruteur.telMobile,
                    mail: null,
                    mdp: mdp,
                    Err: 2,
                    ErroHandler: ErroHandler,
                    mailExist: mailExist,
                    session: req.session

                });
            } else if (err == 3) {

                // confirmation de l'email et du mot de passe incorrecte
                console.log(err);
                res.render('ajouterRecruteur', {

                    title: 'Inscription d\'un recruteur',
                    nomRecruteur: recruteur.nomRecruteur,
                    prenomRecruteur: recruteur.prenomRecruteur,
                    nomEntreprise: recruteur.nomEntreprise,
                    adresse: recruteur.adresse,
                    ville: recruteur.ville,
                    cp: recruteur.cp,
                    pays: paysHandleError,
                    departement: Departement,
                    telFixe: recruteur.telFixe,
                    telMobile: recruteur.telMobile,
                    mail: null,
                    mdp: null,
                    Err: 3,
                    ErroHandler: ErroHandler,
                    mailExist: mailExist,
                    session: req.session
                });
            }
        } else if (mailExist == 1) {

            res.render('ajouterRecruteur', {

                title: 'Inscription d\'un recruteur',
                nomRecruteur: recruteur.nomRecruteur,
                prenomRecruteur: recruteur.prenomRecruteur,
                nomEntreprise: recruteur.nomEntreprise,
                adresse: recruteur.adresse,
                ville: recruteur.ville,
                cp: recruteur.cp,
                pays: paysHandleError,
                departement: Departement,
                telFixe: recruteur.telFixe,
                telMobile: recruteur.telMobile,
                mail: null,
                mdp: null,
                Err: 4,
                ErroHandler: ErroHandler,
                mailExist: mailExist,
                session: req.session

            });

        }

        utilisateur.save();

        recruteur.save().then(function () {
            utilisateur.setRecruteur(recruteur);
            res.render('login', {
                title: 'Page de connexion',
                message: '',
                email: utilisateur.mail,
                mdp: utilisateur.mdp,
                session: req.session
            });
        })
    });
});
module.exports = router;