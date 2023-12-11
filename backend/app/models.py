from flask_login import UserMixin #La clase UserMixin se cumple las propiedades que tiene que tener un resgistro de usario en flask
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

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
class WorkSpace:
  __tablename__ = 'espacios_trabajo'

  def __init__(self, id, username, workSpaceName):

    self.id = id
    self.username = username
    self.workSpaceName = workSpaceName

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(100), nullable=False)
  workSpaceName = db.Column(db.String(100), nullable=False)

class Boards:
  __tablename__ = 'tableros'
  def __init__ (self, id, boardName, idWorkSpace, idUSer):
    self.id = id
    self.boardName = boardName
    self.idWorkSpace = idWorkSpace
    self.idUser = idUSer

    id = db.Column(db.Integer, primary_key=True)
    boardName = db.Column(db.String(100), nullable=False)
    idWorkSpace = db.Column(db.Integer, ForeignKey('espacios_trabajo.id'), nullable=False)
    idUser = db.Column(db.Integer, ForeignKey('usuarios.id'), nullable=False)

    # Definir las relaciones
    workspace = relationship('WorkSpace', back_populates='Boards')
    user = relationship('UserData', back_populates='Boards')
class BoardState:
  __tablename__ = 'estados_tablero'
  def __init__ (self, id, stateName, statePosition, idBoard):
    self.id = id
    self.stateName = stateName
    self.statePosition = statePosition
    self.idBoard = idBoard

    id = db.Column(db.Integer, primary_key=True)
    stateName = db.Column(db.String(100), nullable=False)
    statePosition = db.Column(db.Integer, nullable=False)
    idBoard = db.Column(db.Integer, ForeignKey('tableros.id'), nullable=False)

    # Definir relaciones
    board = relationship('Boards', back_populates='BoardState')
class Task:
  __tablename__ = 'tareas'
  def __init__ (self, id, taskName, taskDescription, creationDate, dueDate, label, idUser):
    self.id = id
    self.taskName = taskName
    self.taskDescription = taskDescription
    self.creationDate = creationDate
    self.dueDate = dueDate
    self.label = label
    self.idUser = idUser

    id = db.Column(db.Integer, primary_key=True)
    taskName = db.Column(db.String(100), nullable=False)
    taskDescription = db.Column(db.String(100), nullable=False)
    creationDate = db.Column(db.Date, nullable=False)
    dueDate =  db.Column(db.Date, nullable=False)
    idUser = db.Column(db.Integer, ForeignKey('usuarios.id'), nullable=False)

    # Definir relaciones
    user = relationship('UserData', back_populates='Task')

