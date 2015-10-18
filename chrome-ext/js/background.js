comments = []

function register(username, email, password) {
    console.log("Sending register request");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://159.203.97.105:5000/api/users", true);
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
    console.log("Sending login request");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://159.203.97.105:5000/api/login", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
        }
    }
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));
}

function check_logged_in() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://159.203.97.105:5000/api/check", true);
    xhr.onreadystatechange = function(data) {

    }
    xhr.send();
}

function checkIfHasReply(objToPushTo, idToCheck,data){
    for(j=0;j<data.length;j++){
        if (idToCheck == data[j].reply_to) {
            name = idToUser(data[j]);
            date = time_stamp.toDate(data[j].time_stamp) + " | " + time_stamp.toTime(data[j].time_stamp)
            tempObj = {comment_id:data[j].id, user:name, date:date,comment:data[j].comment, replies:[]};
            objToPushTo.replies.push(tempObj);
        }
    }
    for(h=0;h<objToPushTo.replies.length;h++) {
        checkIfHasReply(objToPushTo.replies[h],objToPushTo.replies[h].comment_id,data);
    }
}


function loadComments(url) {//load comments
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://159.203.97.105:5000/api/comments", true);
    xhr.onreadystatechange = function() {
        data.sort(function(x, y){
            if ( x.reply_to - y.reply_to === 0){
                return y.time_stamp - x.time_stamp
            } else {
                return y.reply_to - x.reply_to;
            }
        })
        for(i=0;i<data.length;i++){
            if (data[i].reply_to == 0){
                name = data[i].user
                date = time_stamp.toDate(data[i].time_stamp) + " | " + time_stamp.toTime(data[i].time_stamp)
                tempObj = {comment_id:data[i].id, user:name, date:date,comment:data[i].comment, replies:[]}
                comments.push(tempObj)
            }
        }
        for(i=0;i<comments.length;i++){
            checkIfHasReply(comments[i], comments[i].comment_id, data)
        }
    }
    xhr.send(JSON.stringify({
        url: url,
    }));
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
