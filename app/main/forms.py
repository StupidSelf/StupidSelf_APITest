# @Time     : 2019/4/22 15:02
# @Author   : sonny-zhang
# @FileName : forms.py
# @github   : @sonny-zhang
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import InputRequired, Length


class ProjectForm(FlaskForm):
    """创建项目表单"""
    name = StringField('项目名字', validators=[InputRequired(), Length(3, 16, message='只允许3-32个字符')])
    describe = TextAreaField('详细介绍', validators=[InputRequired(), Length(6, 256, message='只允许6-256个字符')])
    submit = SubmitField('创建')
