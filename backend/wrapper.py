from . import db
from .models import User, Community, TagTable, Tag, MatchedSchedule, MatchedTable,EmptySchedule
from .calc_empty import calc_empty_schedule_humans

def get_CurrentUser():
    user=db.session.query(User).filter_by(id=1).first()
    return user

def users_empty_schedule_get(user_info):
    """
    '/users/empty_schedule/', methods=['GET']
    input: user_info: User
    output: res_dic: Dict
    """
    res_dic = {}
    info_lst = []
    empty_schedules = db.session.query(EmptySchedule).filter_by(user_id=user_info.id).all()
    for empty_s in empty_schedules:
        info_dic = {}
        info_dic["schedule_id"] = empty_s.id
        info_dic["start_at"] = str(empty_s.start_time)
        info_dic["end_at"] = str(empty_s.end_time)
        info_lst.append(info_dic)
    res_dic["empty_schedules"] = info_lst
    return res_dic


def users_empty_schedule_post(user_id, start_time, end_time):
    """
    '/users/empty_schedule/', methods=['POST']
    input: user_id: Int, start_time: Int, end_time: Int
    output: schedule_id
    """
    schedule = EmptySchedule(id=user_id, start_time=start_time, end_time=end_time)
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
    def get_schedule_info(matched_data, is_user1):
        """
        input: matched_data: List[MatchedTable], is_user1: bool
        output: List
        """
        lst = []
        for data in matched_data:
            info_dic = {}
            schedule = db.session.query(MatchedSchedule).filter_by(id=data.info).first()
            schedule, table = matched_s
            info_dic["schedule_id"] = schedule.id
            info_dic["start_at"] = str(schedule.start_time)
            info_dic["end_at"] = str(schedule.end_time)
            info_dic["matched_member"] = {}
            pair_user_id = data.user2_id if is_user1 else data.user1_id
            pair_user = db.session.query(User).filter_by(id=pair_user_id).first()
            info_dic["matched_member"]["user_id"] = pair_user.id
            info_dic["matched_member"]["name"] = pair_user.user_name
            lst.append(info_dic)
        return lst

    res_dic = {}
    info_lst = []
    matched_data1 = db.session.query(MatchedTable).filter_by(user1_id=user_info.id).all()
    if matched_data1:
        info_lst += get_schedule_info(matched_data1, True)
    matched_data2 = db.session.query(MatchedTable).filter_by(user1_id=user_info.id).all()
    if matched_data2:
        info_lst += get_schedule_info(matched_data2, False)
    res_dic["matched_schedules"] = info_lst
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
        tags = db.session.query(TagTable).filter_by(user_id=user.id).all()
        for tag in tags:
            tag_info = db.session.query(Tag).filter_by(id=tag.tag_id).first()
            info_dic["tags"].append(tag_info.tag_name)
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
    return list(set(res_array))


# /users/matched_schedule/ [POST]で呼ばれる 
def find_matched_result(user_info):
    """
    input: user_info: User
    output: user_id: Int, matched_user_id: Int, matched_start_time: Int
    """
    community_id = user_info.community_id
    # そのユーザーが持つ全てのタグに対してそのタグを持つユーザーを調べる
    dic = {}  # {tag_id: List[users]}
    tagtables = db.session.query(TagTable).filter_by(user_id=user_info.id).all()
    for tagtable in tagtables:
        tables = db.session.query(TagTable).filter_by(tag_id=tagtable.tag_id).all()
        dic[tagtable.tag_id] = tables
    # 同じコミュニティーかつ同じタグを持つユーザーのid
    candidate_lst = []
    for tag_id, table in dic.items():
        user = db.session.query(User).filter_by(id=table.user_id).first()
        if user.community_id == community_id:
            if not user.id in candidate_lst:
                candidate_lst.append(user.id)
    # 空き時間を探索する
    input_dic = {}
    for user_id in candidate_lst:
        empty_schedules = db.session.query(EmptySchedule).filter_by(user_id=user_id).all()
        input_dic[user_id] = {"xxx_times": []}
        for empty_schedule in empty_schedules:
            input_dic[user_id]["xxx_times"].append(
                {"start_at": empty_schedule.start_time, "ends_at": empty_schedule.end_time})
    matched_users, matched_start_time = calc_empty_schedule_humans(input_dic, user_info.id)
    matched_user_id = matched_users[0] if matched_users[0] != user_info.id else matched_users[1]
    return user_info.id, matched_user_id, matched_start_time


def delete_empty_schedule(user1_id, user2_id, start_time):

    def delete_user_empty_schedule(user_id, start_time):
        end_time = start_time + 30 * 60
        target_schedules = db.session.query(EmptySchedule).filter(
                            start_time <= EmptySchedule.start_time, EmptySchedule.end_time <= end_time).filter(
                            EmptySchedule.user_id == user_id).all()
        # テーブルから削除
        for target_schedule in target_schedules:
            db.session.delete(target_schedule)
            db.session.commit()

    delete_user_empty_schedule(user1_id, start_time)
    delete_user_empty_schedule(user2_id, start_time)
