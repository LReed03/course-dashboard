from flask_cors import CORS
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import auth, credentials
import os
from dbRequests import loadclasses, addclass, editclass, deleteclass

app = Flask(__name__)
CORS(app)
cred_path = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]  # path to your JSON
cred = credentials.Certificate(cred_path)                  # or: credentials.ApplicationDefault
default_app = firebase_admin.initialize_app()


tasks = []
courses = []
DEFAULT_SCHEDULE = [
    {"type": "Lecture", "days": [], "startTime": "", "endTime": ""}
]

"Authentication"

def verify_token():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return None
    id_token = auth_header.split(" ").pop()
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token["uid"]
    except Exception as e:
        print("Token verification failed:", e)
        return None

"Task APIS"

@app.route("/tasks", methods=["GET"])
def get_tasks():
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401  
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
    task = request.json
    if task:
        tasks.append(task)
        return jsonify({"message": "Task added"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/tasks", methods=["DELETE"])
def delete_task():
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
    task = request.json
    if task in tasks:
        tasks.remove(task) 
        return jsonify({"message": "Task removed"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
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
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
        print("not verified")
    courses = loadclasses(uid)
    for c in courses:
        if not c.get("schedule"):   
            c["schedule"] = DEFAULT_SCHEDULE

    return jsonify(courses)


@app.route("/courses", methods=["POST"])
def add_course():
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
    course = request.json
    if course:
        addclass(uid, course)
        if course['schedule']:
            return
        return jsonify({"message": "Course added"}), 201
    return jsonify({"error": "No course provided"}), 400

@app.route("/courses", methods=["DELETE"])
def delete_course():
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
    course = request.json
    if course:
        courseid = course['id']
        deleteclass(uid, courseid)
        # make sure to remove schedules assosiated with course 
        return jsonify({"message": "Task removed"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/courses/<int:course_id>", methods=["PUT"])
def update_course(course_id):
    uid = verify_token()
    if not uid:
        jsonify({"error": "Unauthorized"}), 401 
    course = request.json
    editclass(uid, course, course_id)
    return {"message": "Course updated", "course": course}, 200

        

if __name__ == "__main__":
    app.run(debug=True)
