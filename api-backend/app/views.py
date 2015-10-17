from app import app, db
from flask import request, abort, jsonify
from models import *

def make_json_response(json, status_code=200):
	resp = jsonify(json)
	resp.status_code = status_code
	return resp

@app.route('/users', methods = ['POST'])
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