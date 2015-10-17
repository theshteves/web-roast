from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import os, sys

"""def check_environment():
	environment_dependencies = [
		"ENV",
		"DATABASE_URL"
	]
	can_run = True
	for dep in environment_dependencies:
		if dep not in os.environ:
			print "Need environment variable: " + dep + " to be set"
			can_run = False
	if not can_run:
		sys.exit()

check_environment()"""

app = Flask(__name__)
app.secret_key = "u'^z8aXeQ@<Q4z%"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://boiler:password@localhost:5432/boilermake"
db = SQLAlchemy(app)

from models import *
from views import *
