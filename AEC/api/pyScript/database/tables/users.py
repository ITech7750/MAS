from pyScript.database.manager_db import manager_db
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin
from uuid import uuid4


class User(manager_db.Model, UserMixin, SerializerMixin):
    id = manager_db.Column(manager_db.Integer, primary_key=True, autoincrement=True, nullable=False)
    email = manager_db.Column(manager_db.String(32), unique=True, index=True, nullable=False)
    password = manager_db.Column(manager_db.String(128), nullable=False)
    surname = manager_db.Column(manager_db.String(32), nullable=False)
    name = manager_db.Column(manager_db.String(32), nullable=False)
    patronymic = manager_db.Column(manager_db.String(32), nullable=True)
    urt_logo = manager_db.Column(manager_db.String(64), nullable=True, default="default")
    permissions = manager_db.Column(manager_db.Integer, default=0, nullable=False)
    token = manager_db.Column(manager_db.String(128), nullable=False, default=lambda: str(uuid4()))

    def __init__(self, email, password, surname, name, patronymic=None, urt_logo='default', permissions=0):
        self.email = email
        self.password = password
        self.surname = surname
        self.name = name
        self.patronymic = patronymic
        self.urt_logo = urt_logo
        self.permissions = permissions
        self.token = str(uuid4())

    def check_password(self, other_password):
        return self.password == other_password
