/**
 * Created by Antoine Delahaye on 08/02/2016.
 */
var models = require('../models');
var express = require('express');
var crypto = require('crypto');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session && req.session.user) {
        if(req.session.type==='C'){
            res.redirect('/espaceCandidat');
        }else{
            res.redirect('/espaceRecruteur');
        }
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
                        errornum: null
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

    if(cMailC == mailC && cMdpC == mdpC )
        err = 0;
    if(cMailC == mailC && cMdpC != mdpC )
        err = 1;
    if(cMailC != mailC && cMdpC == mdpC )
        err = 2;
    if(cMailC != mailC && cMdpC != mdpC )
        err = 3;


    if (err == 0 ) {
        var utilisateur = models.Utilisateur.build({
            mail: req.body.mailCandidat,
            mdp: crypto.createHash('md5').update(req.body.mdpCandidat).digest("hex"),
            type: "C"
        });
    } else if (err == 1) {
        res.render('ajouterCandidat', { title:'Inscription d\'un Candidat ', nom: candidat.nom, prenom: candidat.prenom,
            dateNaissance: candidat.dateNaissance, telFixe: candidat.telFixe, telMobile: candidat.telMobile,
            adresse: candidat.adresse, ville: candidat.ville, cp: candidat.cp, pays: candidat.pays,
            mobilite: candidat.mobilite, mail: mailC, mdp: null , errornum : '1'});
    } else if (err == 2) {
        res.render('ajouterCandidat', {
            title: 'Inscription d\'un Candidat ', nom: candidat.nom, prenom: candidat.prenom,
            dateNaissance: candidat.dateNaissance, telFixe: candidat.telFixe, telMobile: candidat.telMobile,
            adresse: candidat.adresse, ville: candidat.ville, cp: candidat.cp, pays: candidat.pays,
            mobilite: candidat.mobilite, mail: null, mdp: mdpC , errornum : '2'});
    }else if (err == 3){
        res.render('ajouterCandidat', { title:'Inscription d\'un Candidat ', nom: candidat.nom, prenom: candidat.prenom,
            dateNaissance: candidat.dateNaissance, telFixe: candidat.telFixe, telMobile: candidat.telMobile,
            adresse: candidat.adresse, ville: candidat.ville, cp: candidat.cp, pays: candidat.pays,
            mobilite: candidat.mobilite, mail:null ,mdp: null, errornum : '3'});
    }


    utilisateur.save();

    candidat.save().then(function() {
        utilisateur.setCandidat(candidat);
        candidat.setDepartement(req.body.dep);
        candidat.setPay(req.body.pays);
        //console.log(candidat.pays);
        res.render('login', { title:'Page de connexion', email: utilisateur.mail, mdp : utilisateur.mdp, message:""});
    })
});
module.exports = router;