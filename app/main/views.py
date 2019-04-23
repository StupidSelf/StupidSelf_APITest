# @Time     : 2019/4/18 16:58
# @Author   : sonny.zhang
# @FileName : views.py
# @github   : @sonny-zhang
from flask import render_template, redirect, url_for, current_app, request, flash
from flask.views import MethodView
from sqlalchemy import desc
from app import db
from app.models import Work
from .forms import WorkForm


class Index(MethodView):
    def get(self):
        return render_template('index.html')


class WorksView(MethodView):
    def get(self):
        """获取工作区"""
        page = request.args.get('page', 1, type=int)
        query = Work.query.filter_by(display=True)
        pagination = query.order_by(desc(Work.id)).paginate(
            page, per_page=current_app.config['API_WORKS_PER_PAGE'],
            error_out=False)
        works = pagination.items
        return render_template('works.html', works=works)


class WorkCreate(MethodView):
    def get(self):
        """创建工作区表单"""
        form = WorkForm()
        return render_template('work_create.html', form=form)

    def post(self):
        """创建工作区"""
        form = WorkForm()
        if form.validate_on_submit():
            work = Work(name=form.name.data,
                        describe=form.describe.data)
            db.session.add(work)
            db.session.commit()
            flash('新的工作区创建成功！')
            return redirect(url_for('main.works'))
        flash('工作区创建失败！')
        return render_template('work_create.html', form=form)


class WorkId(MethodView):
    def get(self, id):
        pass

    def post(self, id):
        pass

