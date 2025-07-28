from flask_cors import CORS
from flask import Flask, jsonify, request
app = Flask(__name__)
CORS(app)

tasks = []
courses = []

"Task APIS"

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    task = request.json
    if task:
        tasks.append(task)
        return jsonify({"message": "Task added"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/tasks", methods=["DELETE"])
def delete_task():
    task = request.json
    if task in tasks:
        tasks.remove(task) 
        return jsonify({"message": "Task removed"}), 201
    return jsonify({"error": "No task provided"}), 400

"Course APIs"

@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(courses)

@app.route("/courses", methods=["POST"])
def add_course():
    course = request.json
    if course:
        courses.append(course)
        return jsonify({"message": "Course added"}), 201
    return jsonify({"error": "No course provided"}), 400

@app.route("/courses", methods=["DELETE"])
def delete_course():
    course = request.json
    if course in courses:
        courses.remove(course) 
        return jsonify({"message": "Task removed"}), 201
    return jsonify({"error": "No task provided"}), 400
        

if __name__ == "__main__":
    app.run(debug=True)
