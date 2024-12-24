from pyScript.database.manager_db import manager_db
from sqlalchemy_serializer import SerializerMixin
from flask_login import UserMixin
from datetime import datetime


class Lot(manager_db.Model, UserMixin, SerializerMixin):
    id = manager_db.Column(manager_db.Integer, primary_key=True, autoincrement=True, nullable=False)

    id_parent = 0

