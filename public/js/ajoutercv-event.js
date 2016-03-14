$(document).ready(function(){

    var competenceIncrement = 0;
    var formationIncrement = 0;
    var expproIncrement = 0;
    var missionIncrement = 0;
    var langueIncrement = 0;
    var interetIncrement = 0;

    $('.modal-trigger').leanModal();

    /**
     * Action du Bouton de la fenêtre modale de la competence
     */
    $('#btn_ajout_competence').click(function(){
        var intitule = $('input[name=intituleCompetence]').val();
        var niveauCompetence = $('select[name=niveauCompetence] option:selected').val();

        $('#elements_CV').append('<input type="hidden" name="competence[' + competenceIncrement + '][intitule]" value="' + intitule + '">');
        $('#elements_CV').append('<input type="hidden" name="competence[' + competenceIncrement + '][niveau]" value="' + niveauCompetence + '">');
        competenceIncrement=competenceIncrement+1;
    });

    /**
     * Action du Bouton de la fenêtre modale de la formation
     */
    $('#btn_ajout_formation').click(function(){
        var intitule = $('input[name=IntituleDiplome]').val();
        var mention = $('input[name=mention]').val();
        var annee = $('input[name=annee]').val();
        var encours = $('input[name=encours]').val();
        var etablissement = $('input[name=etablissement]').val();
        var ville = $('input[name=ville]').val();

        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][intitule]" value="' + intitule + '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][mention]" value="' + mention + '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][annee]" value="' + annee + '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][encours]" value="' + encours+ '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][etablissement]" value="' + etablissement+ '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][ville]" value="' + ville + '">');
        formationIncrement=formationIncrement+1;
    });

    /**
     * Action du Bouton de la fenêtre modale de l'espérience pro
     */
    $('#btn_ajout_Exppro').click(function(){
        var entreprise = $('input[name=entreprise]').val();
        var contrattype = $('select[name=contrattype] option:selected').val();
        var poste = $('input[name=poste]').val();
        var datedebut= $('input[name=datedebut]').val();
        var datefin = $('input[name=datefin]').val();
        var ville = $('input[name=villeXp]').val();
        var pays= $('select[name=pays] option:selected').val();

        var mission1 = $('input[name=intituleMission1]').val();
        var mission2 = $('input[name=intituleMission2]').val();
        var mission3 = $('input[name=intituleMission3]').val();

        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][entreprise]" value="' + entreprise + '">');
        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][contrattype]" value="' + contrattype + '">');
        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][poste]" value="' + poste + '">');
        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][datedebut]" value="' + datedebut+ '">');
        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][datefin]" value="' + datefin + '">');
        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][ville]" value="' + ville + '">');
        $('#elements_CV').append('<input type="hidden" name="exppro[' + expproIncrement + '][pays]" value="' + pays + '">');

        $('#elements_CV').append('<input type="hidden" name="mission[' + missionIncrement + '][intitule]" value="' + mission1 + '">');
        missionIncrement=missionIncrement+1;
        $('#elements_CV').append('<input type="hidden" name="mission[' + missionIncrement + '][intitule]" value="' + mission2 + '">');
        missionIncrement=missionIncrement+1;
        $('#elements_CV').append('<input type="hidden" name="mission[' + missionIncrement + '][intitule]" value="' + mission3 + '">');

        expproIncrement=expproIncrement+1;
        missionIncrement =0;
    });

    /**
     * Action du Bouton de la fenêtre modale de la langue
     */
    $('#btn_ajout_Langue').click(function(){
        var langue = $('input[name=denominationLangue]').val();
        var niveau= $('select[name=niveauLangue] option:selected').val();

        $('#elements_CV').append('<input type="hidden" name="langue[' + langueIncrement + '][langue]" value="' + langue + '">');
        $('#elements_CV').append('<input type="hidden" name="langue[' + langueIncrement + '][niveau]" value="' + niveau + '">');

        langueIncrement=langueIncrement+1;
    });

    /**
     * Action du Bouton de la fenêtre modale du centre d'interet
     */
    $('#btn_ajout_Interet').click(function(){
        var intitule = $('input[name=intituleInteret]').val();

        $('#elements_CV').append('<input type="hidden" name="interet[' + interetIncrement + '][intitule]" value="' + intitule + '">');

        interetIncrement=interetIncrement+1;
    });


});