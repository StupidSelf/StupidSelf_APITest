# @Time     : 2019/4/18 16:36
# @Author   : sonny.zhang
# @FileName : __init__.py.py
# @github   : @sonny-zhang
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from config import config


db = SQLAlchemy()
bootstrap = Bootstrap()
moment = Moment()


def create_app(config_name):
    app = Flask(__name__)
    # 加载环境变量
    environment = config[config_name]
    app.config.from_object(environment)
    # 对环境初始化
    environment.init_app(app)
    db.init_app(app)
    bootstrap.init_app(app)
    moment.init_app(app)

    from app.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
