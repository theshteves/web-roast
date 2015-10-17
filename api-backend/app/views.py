from app import app, db
from flask import request, abort, jsonify, render_template
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

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/api/users', methods = ['POST'])
def register_user():
	username = request.json.get('username')
	password = request.json.get('password')
	email    = request.json.get('email')
	if username is None or password is None or email is None:
		return make_json_response({'data':{'succeeded': False, 'message': "Missing required parameters"}}, 400)
	username = username.lower()
	email    = email.lower()
	if User.query.filter_by(username=username).first() is not None:
		return make_json_response({'data':{'succeeded': False, 'message': "Username already exists"}}, 400)
	if User.query.filter_by(username=username).first() is not None:
		return make_json_response({'data':{'succeeded': False, 'message': "Email already exists"}}, 400)
	user = User(username=username, email=email, password=password)
	db.session.add(user)
	db.session.commit()

	return make_json_response({'data':{'succeeded': True, 'message': "User created successfully"}}, 201)

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
