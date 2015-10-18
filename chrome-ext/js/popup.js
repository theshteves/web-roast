document.addEventListener("DOMContentLoaded", function() {	
	if (document.getElementById('register-submit')) {
		document.getElementById('register-submit').addEventListener('click', function() {
			var username = document.getElementById('register-username').value
			document.getElementById('register-username').value = ""
			var email = document.getElementById('register-email').value
			document.getElementById('register-email').value = ""
			var password = document.getElementById('register-password').value
			document.getElementById('register-password').value = ""
			chrome.extension.getBackgroundPage().register(username, email, password);
		});
	}

	if (document.getElementById('login-submit')) {
		document.getElementById('login-submit').addEventListener('click', function() {
			var username = document.getElementById('login-username').value
			document.getElementById('login-username').value = ""
			var password = document.getElementById('login-password').value
			document.getElementById('login-password').value = ""
			chrome.extension.getBackgroundPage().login(username, password);
		});
	}

	if (document.getElementById('upvote')) {
		document.getElementById('upvote').addEventListener('click', function() {
			chrome.extension.getBackgroundPage().vote(true)
		});
		document.getElementById('downvote').addEventListener('click', function() {
			chrome.extension.getBackgroundPage().vote(false)
		});
	}
});
