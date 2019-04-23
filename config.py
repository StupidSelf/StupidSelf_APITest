# @Time     : 2019/4/19 10:48
# @Author   : sonny-zhang
# @FileName : config.py
# @github   : @sonny-zhang
import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'https://github.com/sonny-zhang'
    # 自动提交数据变更
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    # 默认True, Flask-SQLAlchemy将跟踪对象的修改并发出信号
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # 工作区一页显示数量
    API_WORKS_PER_PAGE = 20

    @staticmethod
    def init_app(app):
        pass


class Development(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('API_DEV_DATABASE_URL') or 'sqlite:///' + \
                              os.path.join(basedir, 'data-dev.sqlite')


class Testing(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = (os.environ.get('API_TEST_DATABASE_URL') or 'sqlite:///' +
                               os.path.join(basedir, 'data-test.sqlite')) + '?check_same_thread=False'
    WTF_CSRF_ENABLED = False


class Product(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('MyBlog_DATABASE_URL')


config = {
    'development': Development,
    'testing': Testing,
    'product': Product,

    'default': Development
}