/**
 * Created by Antoine Delahaye on 09/02/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var Pays;

    models.Pays.findAll({
        attributes: ['id','intitule']
    }).then(function(pays){
        Pays = pays;
        res.render('ajouterCv', { title: 'AJout d\'un Cv', pays:Pays, session: req.session});
    });
});

router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));

    var titrecv = req.body.titre;
    var resumecv = req.body.resumecv;

    var cv = models.CV.build({
        titre: titrecv,
        resume: resumecv,
        CandidatId: req.session.user // to change
    });
    cv.save().then(function(){
        if (req.body.competence != undefined){
            for(var i = 0; i<req.body.competence.length;i++){
                var intitulecompetence = req.body.competence[i].intitule;
                var niveaucompetence = req.body.competence[i].niveau;

                var competence_CV = models.Competence_CV.build({
                    intitule: intitulecompetence,
                    niveau: niveaucompetence,
                    CVId: cv.id
                });

                competence_CV.save().then(function() {
                    competence_CV.setCV(cv);
                });
            }
        }

        if (req.body.formation != undefined) {
            for (var i = 0; i < req.body.formation.length; i++) {
                var intitulediplome = req.body.formation[i].intitule;
                var etabli = req.body.formation[i].etablissement;
                var anneediplome = req.body.formation[i].annee;
                var mentiondiplome = req.body.formation[i].mention;
                var villediplome = req.body.formation[i].ville;
                var encours = req.body.formation[i].encours;

                var formation = models.Formation.build({
                    intitule_diplome: intitulediplome,
                    etablissement: etabli,
                    annee: anneediplome,
                    mention: mentiondiplome,
                    encours: encours,
                    ville: villediplome,
                    CVId: cv.id
                });

                formation.save().then(function () {
                    formation.setCV(cv);
                });
            }
        }

        if (req.body.exppro != undefined){
            for (var i = 0; i < req.body.exppro.length; i++) {
                var entreprisenom = req.body.exppro[i].entreprise;
                var posteentreprise = req.body.exppro[i].poste;
                var dureeposte = null;
                var datedebut = req.body.exppro[i].datedebut;
                var datefin= req.body.exppro[i].datefin;
                var villeposte = req.body.exppro[i].ville;
                var paysposte = req.body.exppro[i].pays;
                var contrattypeid = req.body.exppro[i].contrattype;

                var experience_pro = models.Experience_pro.build({
                    entreprise: entreprisenom,
                    poste: posteentreprise,
                    duree: dureeposte,
                    ville: villeposte,
                    Payid: paysposte,
                    ContratTypeId: parseInt(contrattypeid),
                    CVId: cv.id
                });
                experience_pro.save().then(function() {
                    experience_pro.setCV(cv);
                    if (req.body.mission != undefined) {
                        for (var i = 0; i < req.body.mission.length; i++) {
                            var intitulemission = req.body.mission[i].intitule;

                            var mission_CV = models.Mission_CV.build({
                                intitule: intitulemission,
                                ExperienceProId: experience_pro.id
                            });
                            mission_CV.save().then(function () {
                                mission_CV.setExperience_pro(experience_pro);
                            });
                        }
                    }
                });



            }
        }

        if (req.body.langue != undefined){
            for (var i = 0; i < req.body.langue.length; i++) {
                var langue = req.body.langue[i].langue;
                var niveau= req.body.langue[i].niveau;

                var langue = models.Langue.build({
                    intitule: langue,
                    niveau: niveau,
                    CVId: cv.id
                });

                langue.save().then(function() {
                    langue.setCV(cv);
                });
            }
        }

        if (req.body.interet != undefined){
            for (var i = 0; i < req.body.interet.length; i++) {
                var intituleinteret = req.body.interet[i].intitule;

                var centre_interet = models.Centre_interet.build({
                    intitule: intituleinteret,
                    CVId: cv.id
                });

                centre_interet.save().then(function() {
                    centre_interet.setCV(cv);
                });
            }
        }
    });

    res.redirect("/espaceCandidat");

});
module.exports = router;