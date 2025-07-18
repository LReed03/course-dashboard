from flask_cors import CORS
from flask import Flask, jsonify
app = Flask(__name__)
CORS(app)

tasks = []

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)