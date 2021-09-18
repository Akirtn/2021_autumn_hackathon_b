from http import HTTPStatus
from flask import Blueprint,request,Response,jsonify
from flask_login import login_user, logout_user, login_required,current_user
from .models import User

auth = Blueprint('auth', __name__)


@auth.route('/users/login', methods=['POST'])
def login():
    json=request.json
    email = json['email']
    password = json['password']

    user = User.query.filter_by(email_address=email).first()

    if not user or not user.check_password_correction(password): 
        return Response(status=HTTPStatus.BAD_REQUEST) # if user doesn't exist or password is wrong, reload the page

    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=True)
    retvalue={"user_id":0,"name":"","tags":["kskks"]}
    return jsonify(retvalue)



@login_required
@auth.route('/users/signup',methods=['DELETE'])
def logout():
    if logout_user():
        return Response(status=HTTPStatus.OK)
    return Response(status=HTTPStatus.BAD_REQUEST)
