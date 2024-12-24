from pyScript.database.manager_db import manager_db
from pyScript.database.tables.users import User

# Создание нового пользователя
new_user = User(
    email="test@example.com",
    password="password123",  # Пароль будет автоматически хеширован
    surname="Testov",
    name="Ivan",
    patronymic="Ivanovich"
)

# Добавление пользователя в базу данных
manager_db.session.add(new_user)
manager_db.session.commit()

print("Test user has been added.")
