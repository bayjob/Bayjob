$(document).ready(function(){

    var competenceIncrement = 0;
    var missionIncrement = 0;


    $('.modal-trigger').leanModal();

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

        $('#elements_Offre').append('<input type="hidden" name="competence[' + competenceIncrement + '][intitule]" value="' + intitule + '">');
        $('#elements_Offre').append('<input type="hidden" name="competence[' + competenceIncrement + '][niveau]" value="' + niveauCompetence + '">');

        $('#apercucompetence').append('<div id="competence['+competenceIncrement+']" class="apercucompetenceclass"><a href="#!" id="deletecompetence['+competenceIncrement+']" class="deletecompetenceclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;<strong>'+intitule+'</strong>&nbsp;&nbsp;-&nbsp;&nbsp;'+niveauCompetencetext+'</br></br></div>');
        $('#apercucompetence').append(' ')
         competenceIncrement=competenceIncrement+1;
    });

    /**
     * Action du Bouton de la fenêtre modale mission
     */

    $('#apercumission').on('click', '.apercumissionclass .deletmissionclass',function(){
        $(this).parent().remove();
        var premierepartie=($(this).parent().attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var id=secondepartie[0];
        $( "input[name*='mission["+id+"]']" ).remove();
    });

    $('#btn_ajout_mission').click(function(){
        var intitule = $('input[name=intituleMission]').val();
        $('#elements_Offre').append('<input type="hidden" name="mission[' + missionIncrement + '][intitule]" value="' + intitule + '">');
        $('#apercumission').append('<div id="mission['+missionIncrement+']" class="apercumissionclass"><a href="#!" id="deletemission['+missionIncrement+']" class="deletmissionclass" ><i class="tiny material-icons">close</i></a>&nbsp;&nbsp;&nbsp;&nbsp;'+intitule+'</br></br></div>');
        missionIncrement=missionIncrement+1;

    });

});