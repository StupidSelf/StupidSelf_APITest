# @Time     : 2019/4/22 15:02
# @Author   : sonny-zhang
# @FileName : forms.py
# @github   : @sonny-zhang
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import InputRequired, Length


class WorkForm(FlaskForm):
    """工作区表单"""
    name = StringField('工作区名字', validators=[InputRequired(), Length(3, 32, message='3-32个字符')])
    describe = TextAreaField('详细介绍', validators=[InputRequired(), Length(6, 256, message='6-256个字符')])
    submit = SubmitField('创建')
