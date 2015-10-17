function register(username, email, password) {
    console.log("Sending register request");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/api/users",
        data: {
            username: username,
            email: email,
            password: password
        },
        success: function(data) {
            console.log(data);
        }
    });
}

function login(username, password) {
    console.log("Sending login request");
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/api/users",
        data: {
            username: username,
            password: password
        },
        success: function(data) {
            console.log(data);
        }
    });
}
