function register(username, email, password) {
    console.log("Sending register request");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://webroast.club/api/users", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify({
        username: username,
        email: email,
        password: password
    }));
}

function login(username, password) {
    console.log("Sending lpogin request");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://webroast.club/api/login", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));
}

function check_logged_in() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://webroast.club/api/check", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }
    xhr.send('{}');
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url && changeInfo.url.substr(0,4) === 'http') {
        var xhr = new XMLHttpRequest();
        url = changeInfo.url.substr(changeInfo.url.indexOf('://') + 3)
        xhr.open("GET", "http://webroast.club/api/site/" + encodeURIComponent(url), true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    json = JSON.parse(xhr.responseText);
                    chrome.browserAction.setBadgeText({
                        text: json.data.score,
                        tabId: tabId
                    })
                }
            }
        }
        xhr.send();
    }
});
