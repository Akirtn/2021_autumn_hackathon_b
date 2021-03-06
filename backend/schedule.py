import http
from flask import Blueprint,request,jsonify,render_template
from flask.helpers import locked_cached_property, url_for
from flask.wrappers import Response
from flask_login import login_user, logout_user, login_required
from sqlalchemy.sql.visitors import replacement_traverse
from .wrapper import delete_empty_schedule, find_matched_result, users_empty_schedule_get, users_empty_schedule_post, users_matched_schedule_get, users_matched_schedule_save
from .models import Tag, TagTable, User,Community,EmptySchedule,MatchedSchedule
from . import db,bcrypt
from .wrapper import get_CurrentUser
schdule = Blueprint('schedule', __name__)

@schdule.route('/')
def index():
    return render_template('index.html')



@schdule.route('/users/empty_schedule/',methods=['GET'])
# @login_required
def get_schdule():
    ret_value=users_empty_schedule_get(get_CurrentUser())

    return jsonify(ret_value),http.HTTPStatus.OK


@schdule.route('/users/empty_schedule/',methods=['POST'])
# @login_required
def register_schdule():
    json=request.json
    start_time=json["start_time"]
    end_time=json["end_time"]

    user_id=get_CurrentUser().id

    schedule_id = users_empty_schedule_post(user_id,start_time,end_time)
    # TODO return value
    return jsonify({"schedule_id":schedule_id}),http.HTTPStatus.OK

@schdule.route('/users/empty_schedule/<int:schedule_id>/',methods=['DELETE'])
# @login_required
def delete_schdule(schedule_id):
    # TODO：user_idとschedule_idがあっているか確認してから削除
    return Response(status=http.HTTPStatus.BAD_REQUEST)

@schdule.route('/users/matched_schedule/',methods=['GET'])
# @login_required
def get_matched_schdule():
    # res=users_matched_schedule_get(get_CurrentUser())
    ret={
        "matched_schedules": [
            {
            "schedule_id": 3,
            "start_at": "1632036660",
            "end_at": str(1632036660+30*60),
            "matched_member": {
                "user_id": 2,
                "name": "ijichi"
            }
            }
        ]
    }
    return jsonify(ret)

@schdule.route('/users/matched_schedule/',methods=['POST'])
# @login_required
def register_matched_schdule():
    user_id=get_CurrentUser().id
    # TODO
    # users_matched_schedule_save(current_user.id)
    # TODO：intか確認
    # uid,matched_user_id,start_time=find_matched_result(get_CurrentUser())
    # if uid is not None:    
    #     users_matched_schedule_save(uid,start_time,30*60,matched_user_id)
    #     delete_empty_schedule(uid,matched_user_id,start_time)
    return Response(status=200)

def g_pass(passwd):
    return bcrypt.generate_password_hash(
            passwd).decode('utf-8')

def addcommit(o):
    db.session.add(o)
    db.session.commit()


@schdule.route('/test/')
def test():
    password_hash1 = g_pass('test1')
    user1 = User(id =1,user_name='Arita',community_id=1,email_address='hoge1@fuga.com',password_hash=password_hash1)
    com1 = Community(id =1,community_name="com1", domain_addr="@fuga.com")
    tag1 = Tag(id =1,tag_name='new')
    tagtable1 = TagTable(id =1,user_id =1,tag_id=1)
    # 2021-9-20 15:00:00, 2021-9-20 17:30:00
    emptyschedule1 = EmptySchedule(id=1,user_id=1,start_time=1632150000,end_time=1632159000)
    addcommit(com1)
    addcommit(user1)
    addcommit(tag1)
    addcommit(tagtable1)
    addcommit(emptyschedule1)
    db.session.commit()
    
    password_hash2 = g_pass('test2')
    user2 = User(id =2,user_name='Ijichi',community_id=1,email_address='hoge2@fuga.com',password_hash=password_hash2)
    com2 = Community(id =2,community_name="com1", domain_addr="@fuga.com")
    tag2 = Tag(id =2,tag_name='new')
    tagtable2 = TagTable(id =2,user_id =2,tag_id=2)
    # 2021-9-20 16:00:00, 2021-9-20 17:30:00
    emptyschedule2 = EmptySchedule(id=2,user_id=2,start_time=1632153600,end_time=1632159000)
    addcommit(com2)
    addcommit(user2)
    addcommit(tag2)
    addcommit(tagtable2)
    addcommit(emptyschedule2)
    db.session.commit()

    password_hash3 = g_pass('test3')
    user3 = User(id =3,user_name='Yoshida',community_id=1,email_address='hoge3@fuga.com',password_hash=password_hash3)
    com3 = Community(id =3,community_name="com1", domain_addr="@fuga.com")
    tag3 = Tag(id =3,tag_name='new')
    tagtable3 = TagTable(id =3,user_id =3,tag_id=3)
    # 2021-9-20 15:00:00, 2021-9-20 17:00:00
    emptyschedule3 = EmptySchedule(id=3,user_id=3,start_time=1632150000,end_time= 1632157200)
    addcommit(com3)

    addcommit(user3)
    addcommit(tag3)
    addcommit(tagtable3)
    addcommit(emptyschedule3)

    password_hash4 = g_pass('test4')
    user4 = User(id =4,user_name='Tanemoto',community_id=1,email_address='hoge4@fuga.com',password_hash=password_hash4)
    com4 = Community(id =4,community_name="com1", domain_addr="@fuga.com")
    tag4 = Tag(id =4,tag_name='new')
    tagtable4 = TagTable(id =4,user_id =4,tag_id=4)
    # 2021-9-20 15:00:00, 2021-9-20 16:30:00
    emptyschedule4 = EmptySchedule(id=4,user_id=4,start_time=1632150000,end_time=1632155400)
    addcommit(user4)
    addcommit(tag4)
    addcommit(com4)
    addcommit(tagtable4)
    addcommit(emptyschedule4)

    password_hash5 = g_pass('test5')
    user5 = User(id =5,user_name='Asahara',community_id=5,email_address='hoge5@fuga.com',password_hash=password_hash5)
    com5 = Community(id =5,community_name="com1", domain_addr="@fuga.com")
    tag5 = Tag(id =5,tag_name='new')
    tagtable5 = TagTable(id =5,user_id =5,tag_id=5)
    # 2021-9-20 15:00:00, 2021-9-20 16:00:00
    emptyschedule5 = EmptySchedule(id=5,user_id=5,start_time=1632150000,end_time=1632153600)
    addcommit(com5)
    addcommit(user5)
    addcommit(tag5)
    addcommit(tagtable5)
    addcommit(emptyschedule5)

    c_data=db.session.query(Community).filter_by(community_name='com1').all()
    for data in c_data:
        print(data.community_name, data.domain_addr)
    return 'Test'

