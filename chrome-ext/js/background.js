var comment_string = "";

function vote(upvote) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://webroast.club/api/vote", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                update_badge()
            }
        }
        xhr.send(JSON.stringify({
            upvote: upvote,
            url: url
        }));
    });
}

function comment(text, reply_to) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://webroast.club/api/comments", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                // DISPLAY NEW COMMENT WITHOUT NEED TO REFRESH
            }
        }
        xhr.send(JSON.stringify({
            comment: text,
            reply_to: reply_to,
            url: url
        }));
    });
}

function register(username, email, password, password_confirmation) {
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
        password: password,
        password1: password_confirmation
    }));
}

function login(username, password) {
    console.log("Sending login request");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://webroast.club/api/login", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {}
    }
    xhr.send(JSON.stringify({
        username: username,
        password: password
    }));
}

function getString() {
    return comment_string;
}

function checkIfHasReply(objToPushTo, idToCheck,data){
    for(j=0;j<data.length;j++){
        if (idToCheck == data[j].replyTo) {
            name = idToUser(data[j]);
            date = toDate(data[j].timeStamp) + " | " + toTime(data[j].timeStamp)
            tempObj = {comment_id:data[j].id, user:name, date:date,comment:data[j].comment, replies:[]};
            objToPushTo.replies.push(tempObj);
        }
    }
    for(h=0;h<objToPushTo.replies.length;h++) {
        checkIfHasReply(objToPushTo.replies[h],objToPushTo.replies[h].comment_id,data);
    }
}

function toDate(timeStamp) {
    d = new Date(parseInt(timeStamp))
    return d.getMonth()+1 + "." + d.getUTCDate() + "." + d.getFullYear().toString().substr(2)
}

function toTime(timeStamp){
    d = new Date(parseInt(timeStamp))
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    s = s<10?"0"+s:s;

    var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    var replacement = h+":"+m;

    replacement += ":"+s;  
    replacement += " "+dd;    

    return replacement;
}

function populateComments(comments) {
    comment_string = ""
    for(i=0;i<comments.length;i++){
        comment_string += '<div class="comment"><div class="comment-wrap"><h5>'+ comments[i].user+'</h5><h6>'+comments[i].date+'</h6><p>'+comments[i].comment+'</p></div></div>'
    }
    return comment_string
} 

function loadComments(callback) {//load comments
    var comments = [];
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url
        if (url && url.substr(0,4) === 'http') {
            url = url.substr(url.indexOf('://') + 3)
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://webroast.club/api/comments/" + encodeURIComponent(url), true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        json = JSON.parse(xhr.responseText)
                        data = json.data.comments
                        data.sort(function(x, y){
                            if ( x.replyTo - y.replyTo === 0){
                                return y.timeStamp - x.timeStamp
                            } else {
                                return y.replyTo - x.replyTo;
                            }
                        })
                        for(i=0;i<data.length;i++){
                            if (data[i].replyTo == -1){
                                name = data[i].user
                                date = toDate(data[i].timeStamp) + " | " + toTime(data[i].timeStamp)
                                tempObj = {comment_id:data[i].id, user:name, date:date,comment:data[i].comment, replies:[]}
                                comments.push(tempObj)
                            }
                        }
                        for(i=0;i<comments.length;i++){
                            checkIfHasReply(comments[i], comments[i].comment_id, data)
                        }
                    }
                    callback(populateComments(comments))
                }
            }
            xhr.send(JSON.stringify({
                url: url,
            }));
        }
    });
}

function update_badge() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var url = tabs[0].url
        var tabId = tabs[0].id
        if (url && url.substr(0,4) === 'http') {
            var xhr = new XMLHttpRequest();
            url = url.substr(url.indexOf('://') + 3)
            xhr.open("GET", "http://webroast.club/api/site/" + encodeURIComponent(url), true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        json = JSON.parse(xhr.responseText);
                        chrome.browserAction.setBadgeText({
                            text: json.data.score.toString(),
                            tabId: tabId
                        })
                    }
                }
            }
            xhr.send();
        }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === 'page-load') {
        update_badge()
        sendResponse({msg: "EVENT HANDLED"});
    }
});