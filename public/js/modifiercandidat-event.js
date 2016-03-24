$(document).ready(function(){
    $('.modal-trigger').leanModal();

    var nom = $('input[name=nomCandidat]').val();
    var prenom= $('input[name=prenomCandidat]').val();
    var datenaissance = $('input[name=dateNaissanceCandidat]').val();
    var fixe = $('input[name=telFixeCandidat]').val();
    var mobile= $('input[name=telMobileCandidat]').val();
    var adresse= $('input[name=adresseCandidat]').val();
    var ville= $('input[name=lieu]').val();
    var cp= $('input[name=cpCandidat]').val();
    var pays = $('select[name=pays] option:selected').val();
    var dep = $('select[name=dep] option:selected').val();
    var mobilite= $('input[name=mobiliteCandidat]').val();
    var mail= $('input[name=mail]').val();
    var mdp= $('input[name=mdp]').val();

    $('#elements_Candidat').append('<input type="hidden" name="oldnom" value="' + nom + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldprenom" value="' + prenom + '">');
    $('#elements_Candidat').append('<input type="hidden" name="olddatenaissance" value="' + datenaissance + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldfixe" value="' + fixe + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldmobile" value="' + mobile + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldadresse" value="' + adresse + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldville" value="' + ville + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldcp" value="' + cp + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldpays" value="' + pays + '">');
    $('#elements_Candidat').append('<input type="hidden" name="olddep" value="' + dep + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldmobilite" value="' + mobilite + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldmail" value="' + mail + '">');
    $('#elements_Candidat').append('<input type="hidden" name="oldmdp" value="' + mdp+ '">');

    $('#modaldata').append('<input type="hidden" name="oldmdp" value="' + mdp+ '">');

     $("#testmdp").click(function() {
         //si le hash de la base est égale au hash du mdp saisi
        if($('input[name=oldmdp]').val() == CryptoJS.MD5($('input[name=mdpancien]').val())){
            $("button[name=enregistrer]").removeClass("disabled");
        }else {
            $("button[name=enregistrer]").addClass("disabled");
        }
     });

});