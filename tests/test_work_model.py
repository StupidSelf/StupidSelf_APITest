# @Time     : 2019/4/19 15:23
# @Author   : sonny-zhang
# @FileName : test_work_model.py
# @github   : @sonny-zhang
import unittest
from app import create_app, db
from app.models import Work


class WorkModelTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_work(self):
        """创建工作区"""
        w = Work(name='测试work1')
        db.session.add(w)
        db.session.commit()
        self.assertTrue(w.name == '测试work1')

