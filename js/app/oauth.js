var storage = window.localStorage;
var config = {
    consumerKey: "IPFARzl7ZBZ5QG50uUuS3g",
    consumerSecret: "owG8M8PptndcYgqn0o2jxBOi0BwZnaFjLvEfEWgNe7Y",
    requestTokenUrl: "https://api.twitter.com/oauth/request_token",
    authorizationUrl: "https://api.twitter.com/oauth/authorize",
    accessTokenUrl: "https://api.twitter.com/oauth/access_token"
};

var oauth = new OAuth(config);
oauth.fetchRequestToken(openAuthoriseWindow, failureHandler);

function openAuthoriseWindow(url) {
    var wnd = window.open(url, 'authorise');
    setTimeout(waitForPin, 100);

    function waitForPin() {
        if (wnd.closed) {
            var pin = prompt("Please enter your PIN", "");
            oauth.setVerifier(pin);
            oauth.fetchAccessToken(getSomeData, failureHandler);
        } else {
            setTimeout(waitForPin, 100);
        }
    }
}

function getSomeData() {
    var accessTokenKey = oauth.getAccessTokenKey();
    var accessTokenSecret = oauth.getAccessTokenSecret();
    storage.accessTokenKey = accessTokenKey;
    storage.accessTokenSecret = accessTokenSecret;
    location.href = "index.html";
}

function failureHandler(data) {
    console.error(data);
}