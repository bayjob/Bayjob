/**
 * Created by Antoine Delahaye on 29/03/2016.
 */
var models = require('../models');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var Pays;
    if (req.session && req.session.user) {
        models.Candidat.findOne({
            include: {model: models.CV},
            where: {UtilisateurId: req.session.user}
        }).then(function (candidat) {
            candidat = candidat;
            models.Pays.findAll({
                attributes: ['id', 'intitule']
            }).then(function (pays) {
                Pays = pays;
                models.Departement.findAll({
                    attributes: ['id', 'intitule']
                }).then(function (departement) {
                    Departement = departement;
                    models.Utilisateur.findOne({
                        where: {id: req.session.user}
                    }).then(function (utilisateur) {
                        utilisateur = utilisateur;
                        res.render('modifierCandidat', {
                            title: 'Modification d\'un Candidat ',
                            nom: candidat.nom,
                            prenom: candidat.prenom,
                            dateNaissance: candidat.dateNaissance,
                            telFixe: candidat.telFixe,
                            telMobile: candidat.telMobile,
                            adresse: candidat.adresse,
                            ville: candidat.ville,
                            cp: candidat.cp,
                            pays: Pays,
                            departement: Departement,
                            mobilite: candidat.mobilite,
                            mail: utilisateur.mail,
                            mdp: utilisateur.mdp,
                            errornum: null,
                            departementusr: candidat.DepartementId,
                            paysusr: candidat.PayId,
                            session: req.session
                        });
                    });
                });
            });
        });
    }else{
        res.redirect('/login');
    }
});

router.post('/', function(req, res, next) {

    var cMailC = req.body.confirmationMailCandidat;
    var mailC = req.body.mailCandidat;
    var cMdpC = req.body.confirmationMdpCandidat;
    var mdpC = req.body.mdpCandidat;

    var err = null;

    if (cMailC == mailC && cMdpC == mdpC)
        err = 0;
    if (cMailC == mailC && cMdpC != mdpC)
        err = 1;
    if (cMailC != mailC && cMdpC == mdpC)
        err = 2;
    if (cMailC != mailC && cMdpC != mdpC)
        err = 3;

    models.Candidat.findOne({
        include: {model: models.CV},
        where: {UtilisateurId: req.session.user}
    }).then(function (candidat) {
        candidat = candidat;
        models.Utilisateur.findOne({
            where: {id: req.session.user}
        }).then(function (utilisateur) {
            utilisateur=utilisateur;
            models.Pays.findAll({
                attributes: ['id', 'intitule']
            }).then(function (pays) {
                Pays = pays;
                models.Departement.findAll({
                    attributes: ['id', 'intitule']
                }).then(function (departement) {
                    Departement = departement;
                    /**
                     * Si le nouveau nom est différent de l'ancien
                     */
                    if (req.body.oldnom != req.body.nomCandidat) {
                        candidat.update({
                            nom: req.body.nomCandidat
                        })
                    }
                    /**
                     * Si le nouveau prenom est different de l'ancien
                     */
                    if (req.body.oldprenom != req.body.prenomCandidat) {
                        candidat.update({
                            prenom: req.body.prenomCandidat
                        })
                    }
                    /**
                     * Si la nouvelle date de naissance est différente de l'ancienne
                     */
                    if (req.body.olddatenaissance != req.body.dateNaissanceCandidat) {
                        candidat.update({
                            dateNaissance: req.body.dateNaissanceCandidat
                        })
                    }
                    /**
                     * Si le nouveau numero fixe est différent de l'ancien
                     */
                    if (req.body.oldfixe != req.body.telFixeCandidat) {
                        candidat.update({
                            telFixe: req.body.telFixeCandidat
                        })
                    }
                    /**
                     * Si le nouveau numero mobile est différent de l'ancien
                     */
                    if (req.body.oldmobile != req.body.telMobileCandidat) {
                        candidat.update({
                            telMobile: req.body.telMobileCandidat
                        })
                    }
                    /**
                     * Si la nouvelle adresse est différente de l'ancienne
                     */
                    if (req.body.oldadresse != req.body.adresseCandidat) {
                        candidat.update({
                            adresse: req.body.adresseCandidat
                        })
                    }
                    /**
                     * Si la nouvelle ville est différente de l'ancienne
                     */
                    if (req.body.oldville != req.body.lieu) {
                        candidat.update({
                            ville: req.body.lieu
                        })
                    }
                    /**
                     * Si le nouveau code postal est différent de l'ancien
                     */
                    if (req.body.oldcp != req.body.cpCandidat) {
                        candidat.update({
                            cp: req.body.cpCandidat
                        })
                    }
                    /**
                     * Si le nouveau pays est différent de l'ancien
                     */
                    if (req.body.oldpays != req.body.pays) {
                        candidat.update({
                            PayId: req.body.pays
                        })
                    }
                    /**
                     * Si le nouveau departement est différent de l'ancien
                     */
                    if (req.body.olddep != req.body.dep) {
                        candidat.update({
                            DepartementId: req.body.dep
                        })
                    }
                    /**
                     * Si la mobilite est différente de l'ancienne
                     */
                    if (req.body.oldmobilite != req.body.mobiliteCandidat) {
                        candidat.update({
                            mobilite: req.body.mobiliteCandidat
                        })
                    }

                    /**
                     * Liste des mois de l'année
                     * @type {string[]}
                     */
                    var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                    /**
                     * Si il n'y a aucune erreur lors de la saisie des nouveaux identifiants
                     */
                    if (err == 0 && req.body.mdpancien == req.body.oldmdp) {
                        /**
                         *  Si les nouveaux mail et mdp sont identiques aux anciens
                         */
                        if(req.body.oldmail == req.body.mailCandidat && req.body.oldmdp == req.body.mdpCandidat){
                            res.render('espaceCandidat', {
                                title: 'Espace candidat',
                                candidat: candidat,
                                mois: mois,
                                session: req.session
                            });
                        }
                        /**
                         * Si le nouveau mail est différent de l'ancien
                         */
                        if(req.body.oldmail != req.body.mailCandidat && req.body.oldmdp == req.body.mdpCandidat){
                            console.log(req.body.oldmail + " -> " + req.body.mailCandidat);
                            utilisateur.update({
                                mail: req.body.mailCandidat
                            });
                        }
                        /**
                         * Si le nouveau mdp est différent de l'ancien
                         */
                        if(req.body.oldmail == req.body.mailCandidat && req.body.oldmdp != req.body.mdpCandidat){
                            console.log(req.body.oldmdp + " -> " + req.body.mdpCandidat);
                            utilisateur.update({
                                mdp: req.body.mdpCandidat
                            });
                        }
                        /**
                         * Si les nouveaux mail et mdp sont différents des anciens
                         */
                        if(req.body.oldmail != req.body.mailCandidat && req.body.oldmdp != req.body.mdpCandidat){
                            console.log(req.body.oldmdp + " -> " + req.body.mdpCandidat);
                            utilisateur.update({
                                mail: req.body.mailCandidat,
                                mdp: req.body.mdpCandidat
                            });
                        }
                    } else if (err == 1) {
                        res.render('modifierCandidat', {
                            title: 'Modification d\'un Candidat ',
                            nom: candidat.nom,
                            prenom: candidat.prenom,
                            dateNaissance: candidat.dateNaissance,
                            telFixe: candidat.telFixe,
                            telMobile: candidat.telMobile,
                            adresse: candidat.adresse,
                            ville: candidat.ville,
                            cp: candidat.cp,
                            pays: Pays,
                            departement: Departement,
                            mobilite: candidat.mobilite,
                            mail: candidat.mail,
                            mdp: candidat.mdp,
                            errornum: '1',
                            departementusr: candidat.DepartementId,
                            paysusr: candidat.PayId
                        });

                    } else if (err == 2) {
                        res.render('modifierCandidat', {
                            title: 'Modification d\'un Candidat ',
                            nom: candidat.nom,
                            prenom: candidat.prenom,
                            dateNaissance: candidat.dateNaissance,
                            telFixe: candidat.telFixe,
                            telMobile: candidat.telMobile,
                            adresse: candidat.adresse,
                            ville: candidat.ville,
                            cp: candidat.cp,
                            pays: Pays,
                            departement: Departement,
                            mobilite: candidat.mobilite,
                            mail: candidat.mail,
                            mdp: candidat.mdp,
                            errornum: '2',
                            departementusr: candidat.DepartementId,
                            paysusr: candidat.PayId
                        });
                    } else if (err == 3) {
                        res.render('modifierCandidat', {
                            title: 'Modification d\'un Candidat ',
                            nom: candidat.nom,
                            prenom: candidat.prenom,
                            dateNaissance: candidat.dateNaissance,
                            telFixe: candidat.telFixe,
                            telMobile: candidat.telMobile,
                            adresse: candidat.adresse,
                            ville: candidat.ville,
                            cp: candidat.cp,
                            pays: Pays,
                            departement: Departement,
                            mobilite: candidat.mobilite,
                            mail: candidat.mail,
                            mdp: candidat.mdp,
                            errornum: '3',
                            departementusr: candidat.DepartementId,
                            paysusr: candidat.PayId
                        });
                    }

                    console.log(JSON.stringify(candidat));
                    res.render('espaceCandidat', {
                        title: 'Espace candidat',
                        candidat: candidat,
                        mois: mois,
                        session: req.session
                    });
                });
            });

        });

    });
});
module.exports = router;