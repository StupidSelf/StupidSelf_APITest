# @Time     : 2019/4/18 16:34
# @Author   : sonny.zhang
# @FileName : manage.py.py
# @github   : @sonny-zhang
from flask_script import Manager
from app import create_app

app = create_app()
manager = Manager(app)

if __name__ == "__main__":
    manager.run()
