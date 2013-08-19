var storage = window.localStorage,
    oauth = new OAuth(oauthInfo);

oauth.fetchRequestToken(
    function(url) {
        var window = window.open(url, 'authorise');
        setTimeout(function waitForPin() {
            if (window.closed) {
                var pin = prompt("Please enter your PIN", "");
                oauth.setVerifier(pin);
                oauth.fetchAccessToken(saveAccessToken, function() {
                    alert("Incorrect PIN");
                    location.href="login.html";
                });
            } else {
                setTimeout(waitForPin, 1000);
            }
        }, 1000);
    },
    function(data) {
        console.error(data);
    }
);

function saveAccessToken() {
    storage.accessTokenKey = oauth.getAccessTokenKey();
    storage.accessTokenSecret = oauth.getAccessTokenSecret();
    location.href = "index.html";
}