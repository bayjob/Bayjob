/**
 * Created by Soufiane on 09/02/2016.
 */
var models  = require('../models');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var sess;

router.get('/', function(req, res, next) {

    var NiveauEtude;
    var Departement;
    var Contrat;
    var Pays;
    models.Departement.findAll({

        attributes: ['id', 'intitule']

    }).then(function(departement){
        Departement = departement;

        models.Niveau_etude.findAll({
            attributes: ['id', 'intitule']

        }).then(function(NE){
            NiveauEtude = NE;

            models.Contrat_type.findAll({

                attributes: ['id', 'intitule']

            }).then(function(contrat){
                Contrat = contrat;

                models.Pays.findAll({

                    attributes: ['id', 'intitule']

                }).then(function(pays) {
                    Pays = pays;
                    res.render('ajouterOffre', { title: 'Ajoutez votre offre' , pays : Pays, contrat : Contrat, NiveauEtud: NiveauEtude, Departement : Departement, session: req.session});
                });
            });
        });
    });



});

router.post('/', function(req, res, next) {

// Recuperation de l'identifiant du recruteur à partir de la session


    var recId;
    sess = req.session;
    models.Recruteur.findOne({

        include : [
            {model: models.Offre},
            {
                model: models.Utilisateur,
                where: {id: sess.user}
            }]

    }).then(function (rec) {

        recId = rec;
        console.log(recId);
    });


    // Récupération des données envoyées via le formulaire

    var handicapBool = true;
    var titre = req.body.titre;
    var xpRequise = req.body.xpRequise;
    var tempDeTravail = req.body.tempDeTravail;
    var resume = req.body.resume;
    var salaire = req.body.salaire;
    var ville = req.body.ville;
    var dateEmission = req.body.dateEmission;
    var handicap = req.body.handicap;
    var mail = req.body.mail;
    var contrat = req.body.contrat;
    var NE = req.body.niveau;
    var payss = req.body.pays;
    var dep = req.body.departement;

    console.log(payss);

    if(handicap == "on") {
        handicapBool = true;
    } else {
        handicapBool = false;
    }

    // Création de l'offre

    var offre = models.Offre.build({

        titre : titre,
        xpRequise : xpRequise,
        resume : resume,
        tempDeTravail : tempDeTravail,
        salaire : salaire,
        ville : ville,
        dateEmission : dateEmission,
        handicap : handicapBool,
        mail : mail,
        ContratTypeId : contrat,
        RecruteurId : recId,
        NiveauEtudeId : NE,
        PayId : payss,
        DepartementId : dep

    });


    offre.save().then(function() {

        // Attribution de l'identifiant du recruteur à l'offre créee

        offre.setRecruteur(recId);

        // ajouter chaque mission dans la table correspondante et y attribuer l'id de l'offre

        for(var i = 0 ; i<req.body.mission.length; i++) {

            var mission = models.Mission_offre.build({

                intitule : req.body.mission[i].intitule,
                OffreId  : offre.id

            });

            mission.save().then(function(){

                mission.setOffre(offre);
            })
        }

        // ajouter chaque compétence dans la table correspondante et y attribuer l'id de l'offre

        for(var i = 0; i<req.body.competence.length; i++) {

            var competence = models.Competence_offre.build({

                intitule : req.body.competence[i].intitule,
                niveau : req.body.competence[i].niveau,
                OffreId : offre.id
            });

            competence.save().then(function(){

                competence.setOffre(offre);

            })
        }
    });

    res.redirect('/espaceRecruteur');

});

module.exports = router;