from flask import Blueprint,jsonify
from flask_login import login_user, logout_user, login_required,current_user
from . import db
from .wrapper import users_members

main = Blueprint('main', __name__)

@main.route('/users/members')
@login_required
def get_user_tag_members():
    ret=users_members(current_user)
    return jsonify(ret)

@main.route('/profile')
def profile():
    return 'Profile'


