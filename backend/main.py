from flask import Blueprint,jsonify
from flask_login import login_user, logout_user, login_required,current_user
from . import db

main = Blueprint('main', __name__)

@login_required
@main.route('/users/members')
def get_user_tag_members():
    retvalue={"members":[ {"user_id":0,"name":"","end_at":0,"matched_member":{"user_id":0,"name":"kkk"} }  ]}
    return jsonify(retvalue)

@main.route('/profile')
def profile():
    return 'Profile'


