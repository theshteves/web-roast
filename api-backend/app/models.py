from app import app, db
from flask.ext.bcrypt import Bcrypt
import time
from flask import jsonify

bcrypt = Bcrypt(app)

class Site(db.Model):
	__tablename__ = 'sites'

	id = db.Column(db.Integer, primary_key=True)
	url = db.Column(db.String(128), index=True)

	def __init__(self, url):
		self.url = url

	def __repr__(self):
		return '<id {0} username {1}>'.format(self.id, self.url)

class User(db.Model):
	__tablename__ = 'users'

	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(32), index=True)
	email = db.Column(db.String(128))
	password_hash = db.Column(db.String(128))

	def hash_password(self, password):
		return bcrypt.generate_password_hash(password)

	def check_password(self, password):
		return bcrypt.check_password_hash(self.password_hash, password)

	def __init__(self, username, email, password):
		self.username = username.lower()
		self.email = email.lower()
		self.password_hash = self.hash_password(password)

	def __repr__(self):
		return '<username {}>'.format(self.username)

class Vote(db.Model):
	__tablename__ = 'votes'

	id = db.Column(db.Integer, primary_key=True)
	site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), index=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
	upvote = db.Column(db.Boolean)
	time_stamp = db.Column(db.Integer)

	def __init__(self, site_id, user_id, upvote):
		self.site_id = site_id
		self.user_id = user_id
		self.upvote = upvote
		self.time_stamp = time.time()

	def __repr__(self):
		return '<id {}>'.format(self.id)

class Comment(db.Model):
	__tablename__ = 'comments'

	id = db.Column(db.Integer, primary_key=True)
	site_id = db.Column(db.Integer, db.ForeignKey('sites.id'), index=True)
	user_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
	comment = db.Column(db.String)
	reply_to = db.Column(db.Integer)
	time_stamp = db.Column(db.Integer)

	def __init__(self, site_id, user_id, comment, reply_to):
		self.site_id = site_id
		self.user_id = user_id
		self.comment = comment
		self.reply_to = reply_to
		self.time_stamp = time.time()

	def __repr__(self):
		return '<id {}>'.format(self.id)
