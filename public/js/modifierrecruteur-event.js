$(document).ready(function(){

    var mdp= $('input[name=mdp]').val();

    $('#elements_Recruteur').append('<input type="hidden" name="oldmdp" value="' + mdp+ '">');

    $('#modaldata').append('<input type="hidden" name="oldmdp" value="' + mdp+ '">');

    $('.modal-trigger').leanModal();

    $("#testmdp").click(function() {

        console.log($('input[name=oldmdp]').val() + " -> hash de la base");

        //si le hash de la base est égale au hash du mdp saisi
        if($('input[name=oldmdp]').val() == CryptoJS.MD5($('input[name=mdpancien]').val())){
            $("button[name=enregistrer]").removeClass("disabled");
        }else {
            $("button[name=enregistrer]").addClass("disabled");
        }
    });

});
