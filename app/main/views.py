# @Time     : 2019/4/18 16:58
# @Author   : sonny.zhang
# @FileName : views.py
# @github   : @sonny-zhang
from flask import render_template, redirect, url_for, current_app, request, flash, jsonify
from flask.views import MethodView
from sqlalchemy import desc
from app import db
from app.models import Project
from .forms import ProjectForm
from typing import Any, Optional, Dict


class Welcome(MethodView):
    def get(self):
        """默认首页：欢迎页面"""
        return render_template('welcome.html')


class Index(MethodView):
    def get(self):
        page = request.args.get('page', 1, type=int)
        query = Project.query.filter_by(display=True)
        pagination = query.order_by(desc(Project.id)).paginate(
            page, per_page=current_app.config['API_WORKS_PER_PAGE'],
            error_out=False)
        projects = pagination.items
        return render_template('index.html', projects=projects)


class ProjectsView(MethodView):
    def get(self):
        """获取项目"""
        page = request.args.get('page', 1, type=int)
        query = Project.query.filter_by(display=True)
        pagination = query.order_by(desc(Project.id)).paginate(
            page, per_page=current_app.config['API_WORKS_PER_PAGE'],
            error_out=False)
        projects = pagination.items
        return render_template('projects.html', projects=projects)


class ProjectCreate(MethodView):
    def get(self):
        """项目创建表单"""
        form = ProjectForm()
        return render_template('add/add_project.html', form=form)

    def post(self):
        """处理创建表单"""
        form = ProjectForm()
        if form.validate_on_submit():
            project = Project(name=form.name.data,
                              describe=form.describe.data)
            db.session.add(project)
            db.session.commit()
            flash('项目创建成功！')
            return redirect(url_for('main.projects'))
        flash('项目创建失败！')
        return render_template('add/add_project.html', form=form)


class ProjectDetail(MethodView):
    """项目详情页处理"""
    def get(self, id: int):
        """访问项目详情页"""
        project = Project.query.get_or_404(id)
        pass

