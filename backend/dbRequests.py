import sqlalchemy as db
import os

DATABASE_URL = os.getenv("DATABASE_URL")
engine = db.create_engine(DATABASE_URL)

conn = engine.connect() 
metadata = db.MetaData()

# Adding table names
Class = db.Table('Class', metadata, autoload_with=engine)

Tasks = db.Table('Tasks', metadata, autoload_with=engine)

User = db.Table('User', metadata, autoload_with=engine)

Schedule = db.Table('Schedule', metadata, autoload_with=engine)


# Class DB Requests

def loadclasses(uid):
    query = Class.select().where(Class.c.uid == uid)
    result = conn.execute(query)
    rows = [dict(row._mapping) for row in result]  # convert to dict
    return rows

def addclass(uid, course):
    query = (
        db.insert(Class)
        .values(
            uid=uid,
            name=course['name'],
            code=course['code'],
            professor=course['professor'],
            location=course['location']
        )
        .returning(Class.c.id)   # ask DB to give back the generated PK
    )
    with engine.begin() as conn:
        result = conn.execute(query)
        new_id = result.scalar_one()   # fetch the returned id
    return new_id


def editclass(uid, course, course_id):
    query = db.update(Class).where((Class.c.uid == uid) & (Class.c.id == course_id)).values(name = course['name'], code = course['code'], professor = course['professor'], location = course['location'])
    with engine.begin() as conn:
        result = conn.execute(query)
        print("Update attempt:", {"uid": uid, "course_id": course_id, "rowcount": result.rowcount})
        return result.rowcount


def deleteclass(uid, courseid):
    query = db.delete(Class).where((Class.c.uid == uid) & (Class.c.id == courseid))
    with engine.begin() as conn:
        conn.execute(query)

# Task DB Requests

def loadtasks(uid):
    query = db.select(Tasks).where((Tasks.c.uid == uid))
    result = conn.execute(query)
    rows = [dict(row._mapping) for row in result]  # convert to dict
    return rows

def addtask(uid, task):
    query = db.insert(Tasks).values(uid = uid, 
                                   courseId = task['courseId'], 
                                   title = task['title'],
                                   startDate = task['startDate'],
                                   dueDate = task['dueDate'],
                                   calendarcheck = task['calendarcheck'])
    with engine.begin() as conn:
        conn.execute(query)
         


def edittask(uid, task, taskid):
    query = db.update(Tasks).where((Tasks.c.uid == uid) & (Tasks.c.id == taskid)).values( title = task['title'], courseId = task['courseId'], startDate = task['startDate'], dueDate = task['dueDate'], calendarcheck = task["calendarcheck"])
    with engine.begin() as conn:
        result = conn.execute(query)
        print("After DB Request", result)
        return result.rowcount

def deletetask(uid, taskid):
    query = db.delete(Tasks).where((Tasks.c.uid == uid) & (Tasks.c.id == taskid))
    with engine.begin() as conn:
        conn.execute(query)

def deletecoursetask(uid, courseId):
    query = db.delete(Tasks).where((Tasks.c.uid == uid) & (Tasks.c.courseId == courseId))
    with engine.begin() as conn:
        conn.execute(query)

# Schedule DB Requests

def loadschedule(uid, courseId):
    query = db.select(Schedule).where(
        (Schedule.c.uid == uid) & (Schedule.c.course_id == courseId)
    )
    with engine.begin() as conn:
        result = conn.execute(query)
        rows = []
        for row in result:
            r = dict(row._mapping)
            if r.get("days"):
                r["days"] = r["days"].split(",")
            else:
                r["days"] = []
            rows.append(r)
        return rows

def addschedule(uid, schedule, courseid):
    days=",".join(schedule['days'])
    query = db.insert(Schedule).values(uid = uid,
                                    course_id = courseid,
                                    type = schedule['type'],
                                    days = days,
                                    startTime = schedule['startTime'],
                                    endTime = schedule['endTime']    )
    with engine.begin() as conn:
        conn.execute(query)

def editschedule(uid, courseid, schedules):
    with engine.begin() as conn:
        conn.execute(
            Schedule.delete().where(
                (Schedule.c.uid == uid) & (Schedule.c.course_id == courseid)
            )
        )

        for sched in schedules:
            conn.execute(
                db.insert(Schedule).values(
                    uid=uid,
                    course_id=courseid,
                    type=sched["type"],
                    days=",".join(sched["days"]),
                    startTime=sched["startTime"],
                    endTime=sched["endTime"]
                )
            )


def deleteschedule(uid, courseId):
    query = db.delete(Schedule).where((Schedule.c.uid == uid) & (Schedule.c.course_id == courseId))
    with engine.begin() as conn:
        conn.execute(query)
        

# User DB Requests

def createuser(uid):
    try:
        query = db.insert(User).values(Id = uid)
        with engine.begin() as conn:
            conn.execute(query)
    except:
        print("user already exists")

def deleteuser(uid):
    return

def edituser(User):
    return

def loaduser(uid):
    return