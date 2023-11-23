from flask_login import UserMixin #La clase UserMixin se cumple las propiedades que tiene que tener un resgistro de usario en flask
from .postgres_service import get_user
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class UserData:
    __tablename__ = 'usuarios'
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class UserModel(UserMixin):
    def __init__(self, user_data):
        ''' :param user_data: UserData'''
        self.id = user_data.id
        self.username = user_data.username
        self.password = user_data.password

    @staticmethod
    def query(user_id):
        user_doc = get_user(user_id)
        user_data = UserData(
            username=user_doc.id,
            password=user_doc.to_dict()['password']
        )

        return UserModel(user_data)
