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
        res.render('ajouterCv', { title: 'AJout d\'un Cv', pays:Pays});
    });
});

router.post('/', function(req, res, next) {

    var titrecv = req.body.titre;
    var resumecv = req.body.resumecv;

    var intitulediplome = req.body.IntituleDiplome;
    var etabli = req.body.etablissement;
    var anneediplome = req.body.annee;
    var mentiondiplome = req.body.mention;
    var villediplome = req.body.VilleDi;

    var entreprisenom = req.body.entreprise;
    var posteentreprise = req.body.poste;
    var dureeposte = null;
    var villeposte = req.body.villeXp;
    var paysposte = req.body.pays;
    var contrattypeid = req.body.contrattype;

    var intitulemission = req.body.intituleMission;

    var intitulecompetence = req.body.intituleCompetence;
    var niveaucompetence = req.body.niveauCompetence;

    var denominationlangue = req.body.denominationLangue;
    var niveaulangue = req.body.niveauLangue;

    var intituleinteret= req.body.intituleInteret;

    var cv = models.CV.build({
        titre: titrecv,
        resume: resumecv,
        CandidatId: parseInt("1") // to change
    });

    var formation = models.Formation.build({
        intitule_diplome: intitulediplome,
        etablissement: etabli,
        annee: anneediplome,
        mention: mentiondiplome,
        ville: villediplome,
        CVId: cv.id
    });

    var experience_pro = models.Experience_pro.build({
        entreprise: entreprisenom,
        poste: posteentreprise,
        duree: dureeposte,
        ville: villeposte,
        Payid: paysposte,
        ContratTypeId: parseInt(contrattypeid), // to change
        CVId: cv.id
    });

    var mission_CV = models.Mission_CV.build({
        intitule: intitulemission,
        ExperienceProId: experience_pro.id
    });

    var langue = models.Langue.build({
        intitule: denominationlangue,
        niveau: niveaulangue,
        CVId: cv.id
    });

    var centre_interet = models.Centre_interet.build({
        intitule: intituleinteret,
        CVId: cv.id
    });

    var competence_CV = models.Competence_CV.build({
        intitule: intitulecompetence,
        niveau: niveaucompetence,
        CVId: cv.id
    });

    cv.save();
    experience_pro.save().then(function() {
        experience_pro.setCV(cv);
    });
    formation.save().then(function() {
        formation.setCV(cv);
    });
    mission_CV.save().then(function() {
        mission_CV.setExperience_pro(experience_pro);
    });
    competence_CV.save().then(function() {
        competence_CV.setCV(cv);
    });
    langue.save().then(function() {
        langue.setCV(cv);
    });
    centre_interet.save().then(function() {
        centre_interet.setCV(cv);
    });




});
module.exports = router;