document.addEventListener("DOMContentLoaded", function() {	
	document.getElementById('register-submit').addEventListener('click', function() {
		var username = document.getElementById('register-username').value
		var email = document.getElementById('register-email').value
		var password = document.getElementById('register-password').value
		chrome.extension.getBackgroundPage().register(username, email, password);
	});

	document.getElementById('login-submit').addEventListener('click', function() {
		var username = document.getElementById('login-username').value
		var password = document.getElementById('login-password').value
		chrome.extension.getBackgroundPage().login(username, password);
	});
});
