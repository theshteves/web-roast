document.addEventListener("DOMContentLoaded", function() {	
	if (document.getElementById('register-submit')) {
		document.getElementById('register-submit').addEventListener('click', function() {
			var username = document.getElementById('register-username').value
			document.getElementById('register-username').value = ""
			var email = document.getElementById('register-email').value
			document.getElementById('register-email').value = ""
			var password = document.getElementById('register-password').value
			document.getElementById('register-password').value = ""
			var password_confirmation = document.getElementById('register-password-confirmation').value
			document.getElementById('register-password').value = ""
			chrome.extension.getBackgroundPage().register(username, email, password, password_confirmation);
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

	if (document.getElementById('comment-submit')) {
		document.getElementById('comment-submit').addEventListener('click', function() {
			var comment = document.getElementById('comment').value
			document.getElementById('comment').value = ""
			var reply_to = document.getElementById('reply_to').value
			document.getElementById('reply_to').value = ""
			chrome.extension.getBackgroundPage().comment(comment, reply_to);
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
