import http
from flask import Blueprint,request,jsonify
from flask.helpers import locked_cached_property
from flask.wrappers import Response
from flask_login import login_user, logout_user, login_required,current_user
from .wrapper import users_empty_schedule_get, users_empty_schedule_post, users_matched_schedule_get, users_matched_schedule_save
from .models import Tag, TagTable, User,Community,EmptySchedule,MatchedSchedule
from . import db,bcrypt
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
    return Response(status=200)

def g_pass(passwd):
    return bcrypt.generate_password_hash(
            passwd).decode('utf-8')

@schdule.route('/test')
def test():
    password_hash1 = g_pass('test1')
    user1 = User(id =1,user_name='Arita',community_id=1,email_address='hoge1@fuga.com',password_hash=password_hash1)
    com1 = Community(id =1,community_name="com1", domain_addr="@fuga.com")
    tag1 = Tag(id =1,tag_name='new')
    tagtable1 = TagTable(id =1,user_id =1,tag_id=1)
    # 2021-9-20 15:00:00, 2021-9-20 17:30:00
    emptyschedule1 = EmptySchedule(id=1,user_id=1,start_time=1632150000,end_time=1632159000)
    db.session.add(com1)
    db.session.add(user1)
    db.session.add(tag1)
    db.session.add(tagtable1)
    db.session.add(emptyschedule1)
    db.session.commit()
    
    password_hash2 = g_pass('test2')
    user2 = User(id =2,user_name='Ijichi',community_id=1,email_address='hoge2@fuga.com',password_hash=password_hash2)
    com2 = Community(id =2,community_name="com1", domain_addr="@fuga.com")
    tag2 = Tag(id =2,tag_name='new')
    tagtable2 = TagTable(id =2,user_id =2,tag_id=2)
    # 2021-9-20 16:00:00, 2021-9-20 17:30:00
    emptyschedule2 = EmptySchedule(id=2,user_id=2,start_time=1632153600,end_time=1632159000)
    db.session.add(com2)
    db.session.add(user2)
    db.session.add(tag2)
    db.session.add(tagtable2)
    db.session.add(emptyschedule2)
    db.session.commit()

    password_hash3 = g_pass('test3')
    user3 = User(id =3,user_name='Yoshida',community_id=1,email_address='hoge3@fuga.com',password_hash=password_hash3)
    com3 = Community(id =3,community_name="com1", domain_addr="@fuga.com")
    tag3 = Tag(id =3,tag_name='new')
    tagtable3 = TagTable(id =3,user_id =3,tag_id=3)
    # 2021-9-20 15:00:00, 2021-9-20 17:00:00
    emptyschedule3 = EmptySchedule(id=3,user_id=3,start_time=1632150000,end_time= 1632157200)
    db.session.add(com3)

    db.session.add(user3)
    db.session.add(tag3)
    db.session.add(tagtable3)
    db.session.add(emptyschedule3)
    db.session.commit()

    password_hash4 = g_pass('test4')
    user4 = User(id =4,user_name='Tanemoto',community_id=1,email_address='hoge4@fuga.com',password_hash=password_hash4)
    com4 = Community(id =4,community_name="com1", domain_addr="@fuga.com")
    tag4 = Tag(id =4,tag_name='new')
    tagtable4 = TagTable(id =4,user_id =4,tag_id=4)
    # 2021-9-20 15:00:00, 2021-9-20 16:30:00
    emptyschedule4 = EmptySchedule(id=4,user_id=4,start_time=1632150000,end_time=1632155400)
    db.session.add(user4)
    db.session.add(tag4)
    db.session.add(com4)
    db.session.add(tagtable4)
    db.session.add(emptyschedule4)
    db.session.commit()

    password_hash5 = g_pass('test5')
    user5 = User(id =5,user_name='Asahara',community_id=5,email_address='hoge5@fuga.com',password_hash=password_hash5)
    com5 = Community(id =5,community_name="com1", domain_addr="@fuga.com")
    tag5 = Tag(id =5,tag_name='new')
    tagtable5 = TagTable(id =5,user_id =5,tag_id=5)
    # 2021-9-20 15:00:00, 2021-9-20 16:00:00
    emptyschedule5 = EmptySchedule(id=5,user_id=5,start_time=1632150000,end_time=1632153600)
    db.session.add(user5)
    db.session.add(tag5)
    db.session.add(tagtable5)
    db.session.add(emptyschedule5)
    db.session.commit()
    c_data=db.session.query(Community).filter_by(community_name='com1').all()
    for data in c_data:
        print(data.community_name, data.domain_addr)
    return 'Test'

