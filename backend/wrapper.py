from . import db
from .models import User, Community, TagTable, Tag, MatchedSchedule, MatchedTable,EmptySchedule


def users_empty_schedule_get(user_info):
    """
    '/users/empty_schedule/', methods=['GET']
    input: user_info: User
    output: res_dic: Dict
    """
    res_dic = {}
    info_lst = []
    empty_schedules = db.session.query(User).filter_by(user_id=user_info.id).all()
    for empty_s in empty_schedules:
        info_dic = {}
        info_dic["schedule_id"] = empty_s.id
        info_dic["start_at"] = str(empty_s.start_time)
        info_dic["end_at"] = str(empty_s)
        info_lst.append(info_dic)
    res_dic["empty_schedules"] = info_lst
    return res_dic


def users_empty_schedule_post(user_id, start_time, end_time):
    """
    '/users/empty_schedule/', methods=['POST']
    input: user_id: Int, start_time: Int, end_time: Int
    output: schedule_id
    """
    schedule = EmptySchedule(user_id=user_id, start_time=start_time, end_time=end_time)
    db.session.add(schedule)
    db.session.commit()
    return schedule.id

def users_matched_schedule_get(user_info):
    """
    '/users/matched_schedule/', methods=['GET']
    input: user_info: User
    output: res_dic: Dict
    if not match, res_dic[matched_schedules] is [{}]
    """
    res_dic = {}
    info_dic = {}
    flag = False
    matched_s = db.session.query(MatchedSchedule, MatchedTable).join(
                    MatchedSchedule, MatchedTable.user1_id==user_info.id).first()
    if not matched_s:
        flag = False
        matched_s = db.session.query(MatchedSchedule, MatchedTable).join(
                    MatchedSchedule, MatchedTable.user2_id==user_info.id).first()
    if matched_s:
        schedule, table = matched_s
        info_dic["schedule_id"] = schedule.id
        info_dic["start_at"] = str(schedule.start_time)
        info_dic["end_at"] = str(schedule.end_time)
        info_dic["matched_member"] = {}
        pair_user_id = table.user2_id if flag else table.user1_id
        pair_user = db.session.query(User).filter_by(id=pair_user_id).first()
        info_dic["matched_member"]["user_id"] = pair_user.id
        info_dic["matched_member"]["name"] = pair_user.user_name

    res_dic["matched_schedules"] = [info_dic]
    return res_dic


def users_matched_schedule_save(user_id, start_at, end_at,
                                matched_user_id):
    """
​    '/users​/matched_schedule​/', methods=['POST']
    input: start_at: Int, end_at: Int,
           matched_user_id: Int
    output: None
    """
    memo = str(user_id) + "と" + str(matched_user_id) + "の予定です。"
    schedule = MatchedSchedule(start_time=start_at, end_time=end_at, memo=memo)
    db.session.add(schedule)
    db.session.commit()
    user1_id = min(user_id, matched_user_id)
    user2_id = max(user_id, matched_user_id)
    matched_table = MatchedTable(user1_id=user1_id, user2_id=user2_id, info=schedule)
    db.session.add(matched_table)
    db.session.commit()


""" この関数はもう使わない。マッチした時点でバックエンド側で消す。
def users_empty_schedule_delete(user_id, schedule_id):

    # '/users/empty_schedule/{schedule_id}', methods=['DELETE']
    # input: user_id: Int, schedule_id: Int
    # output: None

    target_table, _ = db.session.query(MatchedTable, MatchedSchedule).join(MatchedTable, MatchedSchedule.id==schedule_id).first()
    # 親が削除されれば子も削除される
    db.session.delete(target_table)
    db.session.commit()
"""


def users_members(user_info):
    """
    '/users/members', methods=['GET']
    input: user_info: User
    output: res_dic: Dict
    """
    res_dic = {}
    info_lst = []
    community_id = user_info.comminuty_id
    users_in_commnunity = db.session.query(User).filter_by(community_id=community_id).all()
    for user in users_in_commnunity:
        info_dic = {}
        info_dic["user_id"] = user.id
        info_dic["user_name"] = user.user_name
        info_dic["tags"] = []
        tags = db.session.query(Tag, TagTable).join(Tag, TagTable.user_id==user.id).all()
        for tag, _tagtable in tags:
            info_dic["tags"].append(tag.tag_name)
        info_lst.append(info_dic)
    res_dic["members"] = info_lst
    return res_dic

def user_tags_get(user_info):
    """
    '/users/members', methods=['GET']
    input: user_info: User
    output: res_array: array
    """
    q=db.session.query(Tag,TagTable).join(Tag, TagTable.user_id==user_info.id).all()
    res_array=[t.tag_name for t,_ in q]
    return res_array
