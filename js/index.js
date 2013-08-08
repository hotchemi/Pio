$(function(){

    var storage = window.localStorage;

    // ログインしていない場合はログインページに遷移
    if (!storage.isLogin) {
        location.href = "login.html";
    };

    $("#clear").click(function() {
        $("#textContents").val("");
    })

    $(".tweet").click(function() {
        var tweetText = $("#textContents").val();
        alert(tweetText);
    })

    $("#logout").click(function() {
        storage.removeItem("isLogin");
    })

});