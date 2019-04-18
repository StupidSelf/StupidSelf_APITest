# @Time     : 2019/4/18 16:36
# @Author   : sonny.zhang
# @FileName : __init__.py.py
# @github   : @sonny-zhang
from flask import Flask


def create_app():
    app = Flask(__name__)

    from app.main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
