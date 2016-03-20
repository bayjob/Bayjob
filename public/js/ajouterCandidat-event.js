$( document ).ready(function() {

    $( "#test" ).click(function() {
        var currentMail = $('input[name=mailCandidat]').val();
        console.log(currentMail);
        for (var i = 0; i < $('input[name=emailslength]').val(); i++) {
            var test = "emails["+i+"]";
            $( "input[name='emails["+i+"]']" )
            console.log($( "input[name='emails["+i+"]']" ).val());
            if (currentMail == $( "input[name='emails["+i+"]']" ).val()) {
                $("button[name=enregistrer]").addClass("disabled");
                break;
            }else if (currentMail != $( "input[name='emails["+i+"]']" ).val() && currentMail != ""){
                $("button[name=enregistrer]").removeClass("disabled");
                break;
            }
        }
    });


});