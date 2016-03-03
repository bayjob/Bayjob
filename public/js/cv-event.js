$(document).ready(function(){

    //Evenement gérnt l'ouverture d'une fenetre modale
    $('.modal-trigger').leanModal();

    //Evenement exécuté lorsqu'on clique sur le bouton accepter du cv
    $('#btnAccepterCV').click(function(){
            var utilisateurSession = $('input[name=utilisateurSession]').val();
            var CVId = $('input[name=CVId]').val();
            var OffreId = $('select[name=listeOffresCV]').val();

            $.ajax({
                url: '/notification/accepterCV',
                type: 'POST',
                dataType: 'html', // On désire recevoir du HTML
                data: 'utilisateurSession=' + utilisateurSession + '&CVId=' + CVId + '&OffreId=' + OffreId,
                success: function (code_html, statut) { // code_html contient le HTML renvoyé
                    //alert(code_html);
                }
            });
    });

    //Evenement exécuté lorsqu'on clique sur le bouton refuser du cv
    $('#btnRefuserCV').click(function(){
        var utilisateurSession = $('input[name=utilisateurSession]').val();
        var CVId = $('input[name=CVId]').val();
        var OffreId = $('select[name=listeOffresCV]').val();

        $.ajax({
            url: '/notification/refuserCV',
            type: 'POST',
            dataType: 'html', // On désire recevoir du HTML
            data: 'utilisateurSession=' + utilisateurSession + '&CVId=' + CVId,
            success: function (code_html, statut) { // code_html contient le HTML renvoyé
                //alert(code_html);
            }
        });
    });

});