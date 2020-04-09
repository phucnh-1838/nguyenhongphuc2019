from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class User(UserMixin, db.Model):

    __tablename__ = 'users'
    id =db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    phone = db.Column(db.String(12), unique=True, nullable=True)


class Messages(db.Model):

    __tablename__ = 'messages'
    id =db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    room_id = db.Column(db.Integer)
    sent_at = db.Column(db.DATETIME)
    msg = db.Column(db.TEXT)


class Room(db.Model):

    __tablename__ = 'rooms'
    id =db.Column(db.Integer, primary_key=True)
    roomname = db.Column(db.String(25))

