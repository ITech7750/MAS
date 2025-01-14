from pyScript.database.manager_db import manager_db
from pyScript.manager_login import manager_login
from flask import Flask
from json import load

# Load pages
from pyScript.pages import login
from pyScript.pages import index
from pyScript.pages import registration

# Load tables SQL
from pyScript.database.tables import users

app = Flask(__name__)
app.config['WTF_CSRF_ENABLED'] = False

ip, port = None, None


def load_config():
    global ip, port

    # load configure file
    with open('config.json') as file:
        config = load(file)
    ip, port = config.get("ip", None), config.get("port", None)

    # config file load
    app.config.update(**config)


def load_blueprints():
    # Создал страничку подключил блупринт
    app.register_blueprint(index.blueprint)
    app.register_blueprint(login.blueprint)
    app.register_blueprint(registration.blueprint)


def load_scripts():
    manager_db.init_app(app)
    with app.app_context():
        manager_db.create_all()

    manager_login.init_app(app)


@manager_login.user_loader
def load_user(user_id):
    return users.User.query.filter_by(id=user_id).first()


@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = True
    return response

if __name__ == '__main__':

    load_config()
    load_scripts()
    load_blueprints()

    app.run(ip, port)
