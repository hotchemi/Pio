$(function() {

    var storage = window.localStorage,
        $btnAdd = $("#btnAdd"),
        $count = $("#count");

    if (!storage.isLogin) {
        location.href = "login.html";
    }

    $btnAdd.attr("disabled", true);

    $("#clear").click(function() {
        $("#textContents").val("");
    });

    $btnAdd.click(function() {

        $count.empty();
        $count.prepend("<progress></progress>");

        var option = {};
        option.status = $("#textContents").val();

        var config = {
            consumerKey: oauthInfo.consumerKey,
            consumerSecret: oauthInfo.consumerSecret,
            accessTokenKey: storage.accessTokenKey,
            accessTokenSecret: storage.accessTokenSecret
        };
        var oauth = new OAuth(config);

        if (storage.withLocation) {
            window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    option.lat = position.coords.latitude;
                    option.long = position.coords.longitude;
                },
                function (position) {
                    console.log(position);
                });
        }

        oauth.post("https://api.twitter.com/1.1/statuses/update.json", option,
            function (data) {
                $("#textContents").val("");
                $count.empty();
                $count.prepend("140");
            },
            function(data) {
                console.log(data);
            });
    });

    $("#logout").click(function() {
        storage.clear();
        location.href = "login.html";
    });

    $('#textContents').bind('textchange', function (event, previousText) {
        $("#count").html(140 - parseInt($(this).val().length, 10));
        if ($("#textContents").val() !== "") {
            $("#btnAdd").attr("disabled", false);
        } else {
            $("#btnAdd").attr("disabled", true);
        }
    });

    $("#pickImage").click(function() {

        var pick = new MozActivity({
            "name": "pick",
            "data": { type: ["image/png", "image/jpg", "image/jpeg"]}
        });

        pick.onsuccess = function () { 
            $count.empty();
            $count.prepend("<progress></progress>");

            var option = {};
            option.status = $("#textContents").val();
            option["media[]"] = this.result.blob;
            var config = {
                consumerKey: oauthInfo.consumerKey,
                consumerSecret: oauthInfo.consumerSecret,
                accessTokenKey: storage.accessTokenKey,
                accessTokenSecret: storage.accessTokenSecret
            };
            var oauth = new OAuth(config);
            oauth.post("https://api.twitter.com/1.1/statuses/update_with_media.json", option,
            function (data) {
                $("#textContents").val("");
                $count.empty();
                $count.prepend("140");
            },
            function(data) {
                console.log(data);
            });
        };

        pick.onerror = function () { 
            alert("Cannot pick image.");
        };
    });

    $("#location").click(function() {
        storage.withLocation = storage.withLocation ? 0 : 1;
    });

});