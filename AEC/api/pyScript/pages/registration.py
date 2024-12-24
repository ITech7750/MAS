from pyScript.database.manager_db import manager_db
from flask import Blueprint, jsonify, request
from pyScript.forms.forms import RegistrationForm
from pyScript.database.tables.users import User
from flask_login import login_user
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.datastructures import MultiDict
from werkzeug.security import generate_password_hash

blueprint = Blueprint('register', __name__)


def check_valid_data_from_form(form: RegistrationForm) -> bool:
    """
    Проверяет валидность данных формы регистрации.
    Возвращает True, если данные валидны, иначе False.
    """
    user = User.query.filter_by(email=form.email.data).first()

    if user:
        form.email.errors.append('Пользователь с такой почтой уже зарегистрирован')
        return False

    if form.password.data != form.repeat_password.data:
        form.password.errors.append('Пароли не совпадают')
        return False

    return True


@blueprint.route('/reg', methods=['POST'])
@blueprint.route('/register', methods=['POST'])
@blueprint.route('/registration', methods=['POST'])
def registration():
    if not request.is_json:
        return jsonify({"status": "ERROR", "comment": "Invalid JSON format"}), 400

    data = request.get_json()
    form = RegistrationForm(MultiDict(data))  # Преобразование JSON в MultiDict

    if not form.validate():
        return jsonify({"status": "ERROR", "errors": form.errors}), 400

    if not check_valid_data_from_form(form):
        return jsonify({"status": "ERROR", "errors": form.errors}), 400

    try:
        # Создаем нового пользователя
        user = User(
            email=form.email.data,
            password=generate_password_hash(form.password.data),
            surname=form.surname.data,
            name=form.name.data,
            patronymic=form.patronymic.data or None,  # patronymic может быть необязательным
        )

        # Сохраняем пользователя в базу данных
        manager_db.session.add(user)
        manager_db.session.commit()

        # Логиним пользователя
        login_user(user, remember=True)
        return jsonify({"status": "OK", "comment": "Registration successful"}), 201

    except SQLAlchemyError as e:
        manager_db.session.rollback()  # Откат транзакции в случае ошибки
        return jsonify({"status": "ERROR", "comment": "Database error", "error": str(e)}), 500

    except Exception as e:
        return jsonify({"status": "ERROR", "comment": "Unexpected error", "error": str(e)}), 500


