/**
 * Created by Antoine Delahaye on 08/02/2016.
 */
var models = require('../models');
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res, next) {
    /*Si l'utilisateur est connecté on le redirige vers son espace*/
    if (req.session && req.session.user) {
        if(req.session.type==='C'){
            res.redirect('/espaceCandidat');
        }else{
            res.redirect('/espaceRecruteur');
        }
    /*sinon on continue normalements*/
    }else {
        var Pays;
        models.Pays.findAll({
            attributes: ['id', 'intitule']
        }).then(function (pays) {
            Pays = pays;
            models.Departement.findAll({
                attributes: ['id', 'intitule']
            }).then(function (departement) {
                Departement = departement;
                models.Utilisateur.findAll({
                    attributes: ['mail']
                }).then(function (listemails) {
                    listeMails = listemails;
                    res.render('ajouterCandidat', {
                        title: 'Inscription d\'un Candidat ',
                        nom: null,
                        prenom: null,
                        dateNaissance: null,
                        telFixe: null,
                        telMobile: null,
                        adresse: null,
                        ville: null,
                        cp: null,
                        pays: Pays,
                        departement: Departement,
                        mobilite: null,
                        mail: null,
                        mdp: null,
                        mails: listeMails,
                        errornum: null,
                        session: req.session
                    });

                });
            });
        });
    }
});
router.post('/', function(req, res, next) {

    var candidat = models.Candidat.build({
        nom: req.body.nomCandidat,
        prenom: req.body.prenomCandidat,
        dateNaissance: req.body.dateNaissanceCandidat,
        telFixe: req.body.telFixeCandidat,
        telMobile: req.body.telMobileCandidat,
        adresse: req.body.adresseCandidat,
        ville: req.body.villeCandidat,
        cp: req.body.cpCandidat,
        mobilite: req.body.mobiliteCandidat
    });

    var cMailC = req.body.confirmationMailCandidat;
    var mailC = req.body.mailCandidat ;
    var cMdpC = req.body.confirmationMdpCandidat;
    var mdpC = req.body.mdpCandidat;

    var err = null;
    /* Si aucune erreur sur mail et sur mdp*/
    if(cMailC == mailC && cMdpC == mdpC )
        err = 0;
    /* Si aucune erreur sur mail mais erreur sur mdp*/
    if(cMailC == mailC && cMdpC != mdpC )
        err = 1;
    /* Si aucune erreur sur mdp mais erreur sur mail*/
    if(cMailC != mailC && cMdpC == mdpC )
        err = 2;
    /* Si  erreur sur mail et sur mdp*/
    if(cMailC != mailC && cMdpC != mdpC )
        err = 3;

    /* Si erreur 0 alors on insere  */
    if (err == 0 ) {
        var utilisateur = models.Utilisateur.build({
            mail: req.body.mailCandidat,
            mdp: crypto.createHash('md5').update(req.body.mdpCandidat).digest("hex"),
            type: "C"
        });
    /* sinon selon l'erreur on renvoi la page avec differents parametres*/
    } else if (err == 1) {
        res.render('ajouterCandidat', { title:'Inscription d\'un Candidat ', nom: candidat.nom, prenom: candidat.prenom,
            dateNaissance: candidat.dateNaissance, telFixe: candidat.telFixe, telMobile: candidat.telMobile,
            adresse: candidat.adresse, ville: candidat.ville, cp: candidat.cp, pays: candidat.pays,
            mobilite: candidat.mobilite, mail: mailC, mdp: null , errornum : '1', session: req.session});
    } else if (err == 2) {
        res.render('ajouterCandidat', {
            title: 'Inscription d\'un Candidat ', nom: candidat.nom, prenom: candidat.prenom,
            dateNaissance: candidat.dateNaissance, telFixe: candidat.telFixe, telMobile: candidat.telMobile,
            adresse: candidat.adresse, ville: candidat.ville, cp: candidat.cp, pays: candidat.pays,
            mobilite: candidat.mobilite, mail: null, mdp: mdpC , errornum : '2', session: req.session});
    }else if (err == 3){
        res.render('ajouterCandidat', { title:'Inscription d\'un Candidat ', nom: candidat.nom, prenom: candidat.prenom,
            dateNaissance: candidat.dateNaissance, telFixe: candidat.telFixe, telMobile: candidat.telMobile,
            adresse: candidat.adresse, ville: candidat.ville, cp: candidat.cp, pays: candidat.pays,
            mobilite: candidat.mobilite, mail:null ,mdp: null, errornum : '3', session: req.session});
    }


    utilisateur.save();
    /* On insere le candidat*/
    candidat.save().then(function() {
        utilisateur.setCandidat(candidat);
        candidat.setDepartement(req.body.dep);
        candidat.setPay(req.body.pays);
        //console.log(candidat.pays);
        res.render('login', { title:'Page de connexion', email: utilisateur.mail, mdp :null , message:"", session: req.session});
    })
});
module.exports = router;