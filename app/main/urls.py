# @Time     : 2019/4/18 16:58
# @Author   : sonny.zhang
# @FileName : urls.py
# @github   : @sonny-zhang
from .views import Index, Welcome, ProjectsView, ProjectCreate, ProjectDetail
from . import main

main.add_url_rule('/', view_func=Index.as_view('index'))
main.add_url_rule('/welcome', view_func=Welcome.as_view('welcome'))
main.add_url_rule('/projects', view_func=ProjectsView.as_view('projects'))
main.add_url_rule('/project/create', view_func=ProjectCreate.as_view('project_create'))
# main.add_url_rule('/project/<id:int>', view_func=ProjectDetail.as_view('project_detail'))

