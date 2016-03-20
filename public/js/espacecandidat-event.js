$(document).ready(function(){
    $('.deleteCVclass').click(function(){
        $(this).parent().parent().parent().remove();
        var premierepartie=($(this).attr('id')).split('[');
        var secondepartie=premierepartie[1].split(']');
        var idCV=secondepartie[0];
        $("#var").append('<input type="hidden" name="varCVid'+idCV+'" value="'+idCV+'">');
    });
});

$(window).load(function(){
    if ($("#refreshed").val() == "no") {
        location.reload();
        $("#refreshed").val("yes");
    }

});