from flask import Blueprint
from . import db
from .models import User, Schedule, Community

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Index'

@main.route('/profile')
def profile():
    return 'Profile'

@main.route('/test')
def test():
    com1 = Community(community_name="com1", domain_addr="hoge@fuga.com")
    db.session.add(com1)
    db.session.commit()
    com2 = Community(community_name="com1", domain_addr= "hogehoge@fuga.com")
    db.session.add(com2)
    db.session.commit()
    # c_data = Community.query.filter(Community.community_name == "com1")
    c_data=db.session.query(Community).filter_by(community_name='com1').all()
    for data in c_data:
        print(data.community_name, data.domain_addr)
    return 'Test'
