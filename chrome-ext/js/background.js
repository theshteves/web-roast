logged_in = false;

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
    });
}

function login(username, password) {
    console.log("Sending login request");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://159.203.97.105:5000/api/login", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify({
        username: username,
        password: password
    });
}

function check_logged_in() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://159.203.97.105:5000/api/check", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
        }
    }
    xhr.send();
}
