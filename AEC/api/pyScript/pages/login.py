from pyScript.database.tables.users import User
from flask import Blueprint, jsonify, request
from secrets import token_hex
from pyScript.database.manager_db import manager_db as db

blueprint = Blueprint('login', __name__)

@blueprint.route('/l', methods=['POST'])
@blueprint.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'comment': "Bad json format"}), 400

    json = request.get_json()
    data = json.get('data', None)
    if not data:
        return jsonify({"comment": "No data provided"}), 400

    login = data.get("login", None)
    if not login:
        return jsonify({"comment": "Login not found in data"}), 400

    password = data.get("password", None)
    if not password:
        return jsonify({"comment": "Password not found in data"}), 400
    
    user = User.query.filter_by(email=login).first()
    if not user:
        return jsonify({"comment": "User not found"}), 404
    
    #if not user.check_password(password):
        #return jsonify({"comment": "Invalid credentials"}), 401

    token = token_hex(64)
    user.token = token

    # Сохраняем изменения в базе данных
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"comment": "Database error", "error": str(e)}), 500

    return jsonify({
        "surname": user.surname,
        "name": user.name,
        "patronymic": user.patronymic,
        "urt_logo": user.urt_logo,
        "permissions": user.permissions,
        "id_company": user.id_company,
        "id_aec": user.id_aec,
        "token": token,
        "comment": "OK"
    }), 200
