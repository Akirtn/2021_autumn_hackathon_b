from enum import unique
from flask_login import UserMixin
from . import db
from . import bcrypt

import datetime


# ユーザ情報
class User(db.Model,UserMixin):
    __tablename__= 'users'
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(length=30), nullable=False)
    community_id = db.Column(db.Integer(),db.ForeignKey("communities.id"),nullable=False)
    email_address = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False,default=True)
    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(
            plain_text_password).decode('utf-8')

    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)


# 所属するコミュニティの情報
class Community(db.Model):
    __tablename__ = 'communities'
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    community_name = db.Column(db.String(length=50), nullable=False)
    domain_addr = db.Column(db.String(length=50), nullable=False)


# 友達の情報
class Friend(db.Model):
    __tablename__ = "friends"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(), db.ForeignKey("users.id"), nullable=False)
    # 友達グループの番号
    friend_id = db.Column(db.Integer(), nullable=False)


# 空き時間の情報
class EmptySchedule(db.Model):
    __tablename__ = "emptyschedules"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(),db.ForeignKey("users.id"),nullable=False)
    # 空き時間: start~end(unixtime)
    start_time = db.Column(db.Integer(), nullable=False)
    end_time = db.Column(db.Integer(), nullable=False)

    # datetime('YYYY-MM-DD HH:MM:SS')をunixtime(float)に変換する 
    # def date_to_unix(self, d_time):
    #     return d_time.timestamp()

class MatchedSchedule(db.Model):
    __tablename__ = "matchedschedules"
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    # マッチしたフレンドの情報
    fried_id = db.Column(db.Integer(),db.ForeignKey("friends.id"),nullable=False)
    # マッチした時間帯: start~end（Max1時間）(unixtime)
    start_time = db.Column(db.Integer(), nullable=False)
    end_time = db.Column(db.Integer(), nullable=False)
    # 予定の詳細（誰とどこでetc）
    memo = community_name = db.Column(db.String(), nullable=False)
