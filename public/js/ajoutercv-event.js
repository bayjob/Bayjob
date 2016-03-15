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
    $('#apercucompetence').on('click', '.apercucompetenceclass .deletecompetenceclass',function(){
        $(this).parent().remove();
        var premierepartie=($(this).parent().attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var id=secondepartie[0];
        $( "input[name*='competence["+id+"]']" ).remove();
    });

    $('#btn_ajout_competence').click(function(){
        var intitule = $('input[name=intituleCompetence]').val();
        var niveauCompetence = $('select[name=niveauCompetence] option:selected').val();
        var niveauCompetencetext = $('select[name=niveauCompetence] option:selected').text();

        $('#elements_CV').append('<input type="hidden" name="competence[' + competenceIncrement + '][intitule]" value="' + intitule + '">');
        $('#elements_CV').append('<input type="hidden" name="competence[' + competenceIncrement + '][niveau]" value="' + niveauCompetence + '">');

        $('#apercucompetence').append('<div id="competence['+competenceIncrement+']" class="apercucompetenceclass"><a href="#!" id="deletecompetence['+competenceIncrement+']" class="deletecompetenceclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<strong>'+intitule+'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;'+niveauCompetencetext+'</br></br></div>');
        $('#apercucompetence').append(' ')

        competenceIncrement=competenceIncrement+1;
    });


    /**
     * Action du Bouton de la fenêtre modale de la formation
     */
    $('#apercuformation').on('click', '.apercuformationclass .deleteformationclass',function(){
        $(this).parent().remove();
        var premierepartie=($(this).parent().attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var id=secondepartie[0];
        $( "input[name*='formation["+id+"]']" ).remove();
    });

    $('#btn_ajout_formation').click(function(){
        var intitule = $('input[name=IntituleDiplome]').val();
        var mention = $('input[name=mention]').val();
        var annee = $('input[name=annee]').val();
        var encours = $('input[name=encours]').val();
        var etablissement = $('input[name=etablissement]').val();
        var ville = $('input[name=VilleDi]').val();

        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][intitule]" value="' + intitule + '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][mention]" value="' + mention + '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][annee]" value="' + annee + '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][encours]" value="' + encours+ '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][etablissement]" value="' + etablissement+ '">');
        $('#elements_CV').append('<input type="hidden" name="formation[' + formationIncrement + '][ville]" value="' + ville + '">');

        $('#apercuformation').append('<div id="formation['+formationIncrement+']" class="apercuformationclass"><a href="#!" id="deleteformation['+formationIncrement+']" class="deleteformationclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<strong>'+annee+'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;<strong>'+intitule+'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;'+etablissement+'&nbsp;&nbsp;-&nbsp;&nbsp;'+ville+'</br></br></div>');

        formationIncrement=formationIncrement+1;
    });

    /**
     * Action du Bouton de la fenêtre modale de l'espérience pro
     */
    $('#apercuexppro').on('click', '.apercuexpproclass .deleteexpproclass',function(){
        $(this).parent().remove();
        var premierepartie=($(this).parent().attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var id=secondepartie[0];
        $( "input[name*='exppro["+id+"]']" ).remove();
    });

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


        $('#apercuexppro').append('<div id="exppro['+expproIncrement+']" class="apercuexpproclass"><a href="#!" id="deleteexppro['+expproIncrement+']" class="deleteexpproclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<strong>'+entreprise+'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;'+ville+'&nbsp;&nbsp;-&nbsp;&nbsp;'+poste+'</br>'
         +'<ul style="padding-left: 50px"><li style="list-style-type:disc">'+mission1+'</li><li style="list-style-type:disc">'+mission2+'</li><li style="list-style-type:disc">'+mission3+'</li></ul></br></div>');

        expproIncrement=expproIncrement+1;
        missionIncrement =0;
    });

    /**
     * Action du Bouton de la fenêtre modale de la langue
     */
    $('#aperculangue').on('click', '.aperculangueclass .deletelangueclass',function(){
        $(this).parent().remove();
        var premierepartie=($(this).parent().attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var id=secondepartie[0];
        $( "input[name*='langue["+id+"]']" ).remove();
    });

    $('#btn_ajout_Langue').click(function(){
        var langue = $('input[name=denominationLangue]').val();
        var niveau= $('select[name=niveauLangue] option:selected').val();
        var niveautext= $('select[name=niveauLangue] option:selected').text();

        $('#elements_CV').append('<input type="hidden" name="langue[' + langueIncrement + '][langue]" value="' + langue + '">');
        $('#elements_CV').append('<input type="hidden" name="langue[' + langueIncrement + '][niveau]" value="' + niveau + '">');

        $('#aperculangue').append('<div id="langue['+langueIncrement+']" class="aperculangueclass"><a href="#!" id="deletelangue['+langueIncrement+']" class="deletelangueclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<strong>'+langue+'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;'+niveautext+'</br></br></div>')

        langueIncrement=langueIncrement+1;
    });

    /**
     * Action du Bouton de la fenêtre modale du centre d'interet
     */
    $('#apercuinteret').on('click', '.apercuinteretclass .deleteinteretclass',function(){
        $(this).parent().remove();
        var premierepartie=($(this).parent().attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var id=secondepartie[0];
        $( "input[name*='interet["+id+"]']" ).remove();
    });

    $('#btn_ajout_Interet').click(function(){
        var intitule = $('input[name=intituleInteret]').val();

        $('#elements_CV').append('<input type="hidden" name="interet[' + interetIncrement + '][intitule]" value="' + intitule + '">');

        $('#apercuinteret').append('<div id="interet['+interetIncrement+']" class="apercuinteretclass"><a href="#!" id="deleteinteret['+interetIncrement+']" class="deleteinteretclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;'+intitule+'</br></br></div>');
        interetIncrement=interetIncrement+1;
    });


});