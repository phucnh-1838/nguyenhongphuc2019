from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, EqualTo, ValidationError
from models import User
from passlib.hash import pbkdf2_sha256


class RegistrationForm(FlaskForm):
    username = StringField(
        'username_label',
        validators=[
            InputRequired(message='username is required'),
            Length(min=6, max=25, message='username must be between 4 and 25 characters')
        ]
    )

    password = PasswordField(
        'pwd_label',
        validators=[InputRequired(message='password is required')]
    )

    confirm_password = PasswordField(
        'confirm_pwd_label',
        validators=[InputRequired(message='confirm password is required'),
                    EqualTo('password', message='Password must match')]
    )

    submit_button = SubmitField('Create Account')

    def validate_username(self, username):
        user_object = User.query.filter_by(username=username.data).first()
        if user_object:
            raise ValidationError('Someone else has taken this username')


def invalid_credentials(form, field):
    username_input = form.username.data
    pwd_input = field.data
    user_object = User.query.filter_by(username=username_input).first()
    if user_object is None or not pbkdf2_sha256.verify(pwd_input, user_object.password):
        raise ValidationError('Username or Password is incorrect')


class LoginForm(FlaskForm):
    username = StringField('username_label', validators=[InputRequired(message='Username required')])
    password = PasswordField(
        'password_label',
        validators=[InputRequired(
            message='Password required'),
            invalid_credentials
        ]
    )
    submit_button = SubmitField('Login')

