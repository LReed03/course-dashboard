import sqlalchemy as db

engine = db.create_engine("sqlite:///backend/app.db")

conn = engine.connect() 
metadata = db.MetaData()

# Adding table names
Class = db.Table('Class', metadata, autoload_with=engine)

Tasks = db.Table('Tasks', metadata, autoload_with=engine)

User = db.Table('User', metadata, autoload_with=engine)


# Class DB Requests

def loadclasses(uid):
    query = Class.select().where(Class.c.uid == uid)
    result = conn.execute(query)
    rows = [dict(row._mapping) for row in result]  # convert to dict
    return rows

def addclass(uid, course):
    query = db.insert(Class).values(uid = uid, 
                                    name = course['name'], 
                                    code = course['code'], 
                                    professor = course['professor'], 
                                    location = course['location'])
    with engine.begin() as conn:
        conn.execute(query)

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


def edittask(uid, task):
    query = db.update(Tasks).where((Tasks.c.uid == uid) & (Tasks.c.id == task['id'])).values( title = task['title'], startDate = task['startDate'], dueDate = task['dueDate'], calendarcheck = task["calendarcheck"])
    with engine.begin() as conn:
        result = conn.execute(query)
        return result.rowcount

def deletetask(uid, taskid):
    query = db.delete(Tasks).where((Tasks.c.uid == uid) & (Tasks.c.id == taskid))
    with engine.begin() as conn:
        conn.execute(query)


# Schedule DB Requests

def loadschedule(uid, courseId):
    return

def addschedule(uid, schedule):
    return

def editschedule(uid, schedule):
    return

def deleteschedule(uid, schedule):
    return

# User DB Requests

def createuser(uid):
    query = db.insert(User).values(uid = uid)
    with engine.begin() as conn:
        conn.execute(query)

def deleteuser(uid):
    return

def edituser(User):
    return

def loaduser(uid):
    return