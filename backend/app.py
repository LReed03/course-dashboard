from flask_cors import CORS
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import auth, credentials
import os
from dbRequests import loadclasses, addclass, editclass, deleteclass, createuser, loadtasks, addtask, edittask, deletetask, loadschedule, editschedule, addschedule, deleteschedule, deletecoursetask

app = Flask(__name__)
CORS(app)
if not firebase_admin._apps:
    cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if cred_path:
        cred = credentials.Certificate(cred_path)
    elif os.getenv("K_SERVICE"):
        cred = credentials.ApplicationDefault()
    else:
        raise RuntimeError("No Firebase credentials configured")
    firebase_admin.initialize_app(cred)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

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
        return jsonify({"error": "Unauthorized"}), 401
    tasks = loadtasks(uid)  
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401 
    task = request.json
    if task:
        print(task)
        addtask(uid, task)
        return jsonify({"message": "Task added"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/tasks", methods=["DELETE"])
def delete_task():
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401 
    task = request.json
    if task:
        deletetask(uid, task["id"])
        return jsonify({"message": "Task removed"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401 
    task = request.json
    edittask(uid, task, task_id)
    return {"message": "Task updated", "task": task}, 200   


"Course APIs"

@app.route("/courses", methods=["GET"])
def get_courses():
    uid = verify_token()
    if not uid:
        print("not verified")
        return jsonify({"error": "Unauthorized"}), 401
    courses = loadclasses(uid)
    for c in courses:
        schedule = loadschedule(uid, c["id"])
        if schedule:
            c["schedule"] = schedule
        else:
            c["schedule"] = [dict(DEFAULT_SCHEDULE[0])]

    return jsonify(courses), 200



@app.route("/courses", methods=["POST"])
def add_course():
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401 
    course = request.json
    if course:
        courseId = addclass(uid, course)
        if course['schedule'] != DEFAULT_SCHEDULE:
            for sched in course['schedule']:
                addschedule(uid, sched, courseId)
        return jsonify({"message": "Course added"}), 201
    return jsonify({"error": "No course provided"}), 400

@app.route("/courses", methods=["DELETE"])
def delete_course():
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401 
    course = request.json
    if course:
        courseid = course['id']
        deletecoursetask(uid, courseid)
        deleteschedule(uid, courseid)
        deleteclass(uid, courseid)
        return jsonify({"message": "Task removed"}), 201
    return jsonify({"error": "No task provided"}), 400

@app.route("/courses/<int:course_id>", methods=["PUT"])
def update_course(course_id):
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401 
    course = request.json
    print("Before DB Request", course)
    editclass(uid, course, course_id)
    if course['schedule'] != DEFAULT_SCHEDULE:
        editschedule(uid, course_id, course['schedule'])
    return {"message": "Course updated", "course": course}, 200

# User

@app.route("/signup", methods=["Post"])
def signup():
    uid = verify_token()
    if not uid:
        return jsonify({"error": "Unauthorized"}), 401
    createuser(uid)
    return jsonify({"sucess": "User Created"}), 200


        

if __name__ == "__main__":
    app.run(debug=True)
