# @Time     : 2019/4/18 16:58
# @Author   : sonny.zhang
# @FileName : views.py
# @github   : @sonny-zhang
from flask.views import MethodView


class Index(MethodView):
    def get(self):
        return 'Hello World!'
