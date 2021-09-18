import http
from flask import Blueprint,request,jsonify
from flask.helpers import locked_cached_property
from flask.wrappers import Response
from flask_login import login_user, logout_user, login_required,current_user
from .wrapper import users_empty_schedule_get, users_empty_schedule_post, users_matched_schedule_get, users_matched_schedule_save
schdule = Blueprint('schedule', __name__)

@schdule.route('/')
def index():
    return 'Index'

@login_required
@schdule.route('/users/empty_schedule/',methods=['GET'])
def get_schdule():
    ret_value=users_empty_schedule_get(current_user)
    return jsonify(ret_value),http.HTTPStatus.OK


@login_required
@schdule.route('/users/empty_schedule/',methods=['POST'])
def register_schdule():
    json=request.json()
    start_time=json["start_time"]
    end_time=json["end_time"]

    user_id=current_user.id

    schedule_id = users_empty_schedule_post(user_id,start_time,end_time)
    # TODO return value
    return jsonify({"schedule_id":schedule_id}),http.HTTPStatus.OK

@login_required
@schdule.route('/users/empty_schedule/<int:schedule_id>',methods=['DELETE'])
def delete_schdule(schedule_id):
    # TODO：user_idとschedule_idがあっているか確認してから削除
    return Response(status=http.HTTPStatus.BAD_REQUEST)

@login_required
@schdule.route('/users/matched_schedule/',methods=['GET'])
def get_matched_schdule():
    res=users_matched_schedule_get(current_user)
    return jsonify(res)

@login_required
@schdule.route('/users/matched_schedule/',methods=['POST'])
def register_matched_schdule():
    user_id=current_user.id
    # TODO
    # users_matched_schedule_save(current_user.id)
    # TODO：intか確認
    retvalue={"matched_schedule":{"schedule_id":0,"start_at":0,"end_at":0,"matched_member":{"user_id":0,"name":"kkk"} } }
    return jsonify(retvalue)


# @main.route('/test')
# def test():
#     com1 = Community(community_name="com1", domain_addr="hoge@fuga.com")
#     db.session.add(com1)
#     db.session.commit()
#     com2 = Community(community_name="com1", domain_addr= "hogehoge@fuga.com")
#     db.session.add(com2)
#     db.session.commit()
#     # c_data = Community.query.filter(Community.community_name == "com1")
#     c_data=db.session.query(Community).filter_by(community_name='com1').all()
#     for data in c_data:
#         print(data.community_name, data.domain_addr)
#     return 'Test'
