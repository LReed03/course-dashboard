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

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.json
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        return {"error": "Task not found"}, 404
    task["title"] = data.get("title", task["title"])
    task["dueDate"] = data.get("dueDate", task["dueDate"])
    task["courseID"] = data.get("courseID", task["courseID"])
    return {"message": "Task updated", "task": task}, 200   


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

@app.route("/courses/<int:course_id>", methods=["PUT"])
def update_course(course_id):
    data = request.json

    course = next((c for c in courses if c["id"] == course_id), None)
    if not course:
        return {"error": "Course not found"}, 404

    course["name"] = data.get("name", course["name"])
    course["code"] = data.get("code", course["code"])
    course["professor"] = data.get("professor", course["professor"])
    course["location"] = data.get("location", course["location"])
    course["schedule"] = data.get("schedule", course["schedule"])

    return {"message": "Course updated", "course": course}, 200

        

if __name__ == "__main__":
    app.run(debug=True)
