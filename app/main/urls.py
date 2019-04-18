# @Time     : 2019/4/18 16:58
# @Author   : sonny.zhang
# @FileName : urls.py
# @github   : @sonny-zhang
from .views import *
from . import main

main.add_url_rule('/', view_func=Index.as_view('index'))

