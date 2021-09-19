import http
from flask import Flask,Response
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager,config 
from flask_migrate import Migrate 
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os
# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()
bcrypt = None
def create_app():
    global bcrypt
    config.COOKIE_HTTPONLY=False
    path=os.path.dirname(os.path.abspath(__file__))
    app = Flask(__name__,static_folder=os.path.join(path,"../frontend/build"),static_url_path='',template_folder=os.path.join(path,"../frontend/build"))

    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY",default="secret")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL",'sqlite:///db.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    bcrypt=Bcrypt(app)
    db.init_app(app)
    Migrate(app, db)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.unauthorized_handler
    def unauthrized():
        return 'Unauthrized!!!',400
    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # blueprint for non-auth parts of app
    from .schedule import schdule as schdule_blueprint
    app.register_blueprint(schdule_blueprint)

    # CORS(app, resources={"/*": {"origins": "*"}})

    @app.after_request
    def after_request(response):
        # response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        # response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    return app
