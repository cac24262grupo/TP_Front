from flask import Flask, jsonify
from .databases import DbSession
from .conf import settings


app = Flask(__name__)


@app.get("/")
def index():
    return {"ping": "pong"}


@app.get("/actores")
def list_samples():

    with DbSession(settings.DB_URL) as session:
        session.execute("SELECT * FROM actores")
        actores = session.fetchall()

    return jsonify(actores)
