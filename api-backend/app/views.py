from app import app, db
from flask import session, request, abort, jsonify, render_template
from models import *

def normalize_url(url):
	url = url.lower()
	prefix_index = url.find('://')
	if prefix_index > -1:
		url = url[prefix_index+3:]
	param_index = url.find('?')
	if param_index > -1:
		url = url[:param_index]
	octothorpe_index = url.find('#')
	if octothorpe_index > -1:
		url = url[:octothorpe_index]
	return url

def make_json_response(json, status_code=200):
	resp = jsonify(json)
	resp.status_code = status_code
	return resp
'''
class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
'''

@app.errorhandler(500)
def internal_error(exception):
       	app.logger.error(exception)
       	return render_template('error.html', error=repr(exception)), 500
'''
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    app.logger.error("BRUH:\n\n" + response)
    return render_template("error.html"), 500
'''

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/api/users', methods = ['POST'])
def register_user():
	username  = request.json.get('username')
	password  = request.json.get('password')
	password1 = request.json.get('password1')
	email     = request.json.get('email')
	try:
		if username is None or password is None or password1 is None or email is None:
			return make_json_response({'data':{'succeeded': False, 'message': "Missing required parameters"}}, 400)
		if password != password1:
			return make_json_response({'data':{'succeeded': False, 'message': "Passwords don't match"}}, 400)
		username = username.lower()
		email    = email.lower()
		if User.query.filter_by(username=username).first() is not None:
			return make_json_response({'data':{'succeeded': False, 'message': "Username already exists"}}, 400)
		if User.query.filter_by(username=username).first() is not None:
			return make_json_response({'data':{'succeeded': False, 'message': "Email already exists"}}, 400)
		user = User(username=username, email=email, password=password)
		db.session.add(user)
		db.session.commit()

	except Exception as e:
		return handle_invalid_response(e) # raise InvalidUsage('This view is gone', status_code=410)

	return make_json_response({'data':{'succeeded': True, 'message': "User created successfully"}}, 201)


@app.route('/api/login', methods = ['POST'])
def login_user():
	username = request.json.get('username')
	password = request.json.get('password')
	try:
                if session.get('logged_in') is None:
                        if username is None or password is None:
                                return make_json_response({'data':{'succeeded': False, 'message': "Missing required parameters"}}, 400)
                        user = User.query.filter_by(username=username).first()
                        if user is None:
                                return make_json_response({'data':{'succeeded': False, 'message': "User does not exist"}}, 400)
                        if user.check_password(password):
                                session['logged_in'] = user
                                return make_json_response({'data':{'succeeded': True, 'message': "You're logged in!"}}, 201)
                        else:
                                return make_json_response({'data':{'succeeded': False, 'message': "You're password is wrong"}}, 201)
                else:
                        return make_json_response({'data':{'succeeded': session.get('logged_in'), 'message': "You're already logged in"}}, 201)

	except Exception as e:
		return handle_invalid_response(e) #raise InvalidUsage('This view is gone', status_code=410)

@app.route('/api/vote', methods = ['POST'])
# Force authentication
def vote():
	url = normalize_url(request.json.get('url'))
	user = None
	# user = get user somehow
	upvote = request.json.get('upvote')
	site = Site.query.filter_by(url=url).first()
	if site is None:
		new_site = Site(url=url)
		db.session.add(new_site)
		db.session.commit()
		site = new_site
	vote = Vote(site.id, user.id, upvote)
	db.session.add(vote)
	db.session.commmit()

	return make_json_response({'data':{'succeeded': True, 'message': "Vote created succesfully"}}, 201)
