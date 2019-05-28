# @Time     : 2019/4/19 10:46
# @Author   : sonny-zhang
# @FileName : models.py
# @github   : @sonny-zhang
from . import db
from datetime import datetime


class Work(db.Model):
    __tablename__ = 'works'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    display = db.Column(db.Boolean, default=True)
    describe = db.Column(db.String(256))
    projects = db.relationship('Project', backref='work', lazy='dynamic')


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)
    display = db.Column(db.Boolean, default=True)
    state = db.Column(db.Integer)
    describe = db.Column(db.String(256))
    work_id = db.Column(db.Integer, db.ForeignKey('works.id'))
    interface_collection = db.relationship('InterfaceCollection', backref='project', lazy='dynamic')


class InterfaceCollection(db.Model):
    __tablename__ = 'interface_collections'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    display = db.Column(db.Boolean, default=True)
    describe = db.Column(db.String(256))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    interface = db.relationship('Interface', backref='interface_collection', lazy='dynamic')


class Interface(db.Model):
    __tablename__ = 'interfaces'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    display = db.Column(db.Boolean, default=True)
    describe = db.Column(db.String(256))
    api_path = db.Column(db.String(64))
    api_method = db.Column(db.String(16))
    is_archive = db.Column(db.Boolean, default=False)
    interface_collection_id = db.Column(db.Integer, db.ForeignKey('interface_collections.id'))
    interface_datum = db.relationship('InterfaceDatum', backref='interface', lazy='dynamic')


class InterfaceDatum(db.Model):
    __tablename__ = 'interface_data'
    id = db.Column(db.Integer, primary_key=True)
    interface_id = db.Column(db.Integer, db.ForeignKey('interfaces.id'))
    api_parameters = db.Column(db.String(256))
    api_response = db.Column(db.String(256))
    describe = db.Column(db.String(256))
