$(document).load(function(){
    if ($("#refreshed").val() == "no") {
        location.reload();
        $("#refreshed").val("yes");
    }
});