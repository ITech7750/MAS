from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=3, max=32)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField(
        'Password',
        validators=[
            DataRequired(),
            Length(min=8, message="Password must be at least 8 characters long.")
        ]
    )
    repeat_password = PasswordField(
        'Repeat Password',
        validators=[
            DataRequired(),
            EqualTo('password', message="Passwords must match.")
        ]
    )
    surname = StringField('Surname', validators=[DataRequired(), Length(max=32)])
    name = StringField('Name', validators=[DataRequired(), Length(max=32)])
    patronymic = StringField('Patronymic', validators=[Optional(), Length(max=32)])
