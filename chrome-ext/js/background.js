logged_in = false;

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
