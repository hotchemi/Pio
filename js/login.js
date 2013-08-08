$(function(){

    var storage = window.localStorage;

    $("#login").click(function() {
        storage.isLogin = "true";
    })

});