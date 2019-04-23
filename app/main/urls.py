# @Time     : 2019/4/18 16:58
# @Author   : sonny.zhang
# @FileName : urls.py
# @github   : @sonny-zhang
from .views import Index, WorksView, WorkCreate, WorkId
from . import main

main.add_url_rule('/', view_func=Index.as_view('index'))
main.add_url_rule('/works', view_func=WorksView.as_view('works'))
main.add_url_rule('/work_create', view_func=WorkCreate.as_view('work_create'))
main.add_url_rule('/work_id/<int:id>', view_func=WorkId.as_view('work_id'))
