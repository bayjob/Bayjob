/**
 * Created by Antoine Delahaye on 09/02/2016.
 */
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ajouterCv', { title: 'AJout d\'un Cv'});
});

router.post('/', function(req, res, next) {

    var titrecv = req.body.titre;

    var intitulediplome = req.body.IntituleDiplome;
    var etabli = req.body.etablissement;
    var anneediplome = req.body.annee;
    var mentiondiplome = req.body.mention;
    var villediplome = req.body.VilleDi;

    var entreprisenom = req.body.entreprise;
    var posteentreprise = req.body.poste;
    var dureeposte = req.body.duree;
    var villeposte = req.body.villeXp;

    var intitulemission = req.body.intituleMission;

    var intitulecompetence = req.body.intituleCompetence;
    var niveaucompetence = req.body.niveauCompetence;

    var denominationlangue = req.body.denominationLangue;
    var niveaulangue = req.body.niveauLangue;

    var intituleinteret= req.body.intituleInteret;

    var cv = models.CV.build({ // pb a cette ligne avec Cv...
        titre: titrecv,
        CandidatId: parseInt("14") // to change
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
        ContratTypeId: parseInt("1"), // to change
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


    formation.save().then(function(){
        res.send('ok added : ' );
    });

    mission_CV.save().then(function(){
        res.send('ok added : ' );
    });
    competence_CV.save().then(function(){
        res.send('ok added : ' );
    });
    langue.save().then(function(){
        res.send('ok added : ' );
    });
    centre_interet.save().then(function(){
        res.send('ok added : ' );
    });
    mission_CV.save().then(function(){
        res.send('ok added : ' );
    });

    cv.save().then(function(){
        res.send('ok added : ' );
    });

    experience_pro.save().then(function(){
        res.send('ok added : ' );
    });

});
module.exports = router;
