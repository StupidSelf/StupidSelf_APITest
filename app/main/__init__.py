# @Time     : 2019/4/18 16:56
# @Author   : sonny.zhang
# @FileName : __init__.py.py
# @github   : @sonny-zhang
from flask import Blueprint

main = Blueprint('main', __name__)

from . import urls