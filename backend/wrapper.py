from flask import make_response, jsonify
from . import db
from .models import User, Community, TagTable, Tag

@app.route('/users/members', methods=['GET'])
def get_members(user_info):  # input: User
    res_dic = {}
    info_dic = {}
    community_id = user_info.comminuty_id
    users_in_commnunity = db.session.query(User).filter_by(community_id=community_id).all()
    for user in users_in_commnunity:
        info_dic["user_id"] = user.id
        info_dic["user_name"] = user.user_name
        info_dic["tags"] = []
        tags = db.session.query(TagTable).filter_by(user_id=user_id).all()
        for data in tags:
            tag_info = db.session.query(Tag).filter_by(tag_id=data.tag_id).first() 
            info_dic["tags"].append(tag_info.tag_name)
    res_dic["members"] = [info_dic]
    return make_response(jsonify(res_dic))
