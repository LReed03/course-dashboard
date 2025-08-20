import sqlalchemy as db

engine = db.create_engine("sqlite:///backend/app.db")

conn = engine.connect() 
metadata = db.MetaData()

# Adding table names
Class = db.Table('Class', metadata, 
                 autoload_with=engine)


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

def editclass(uid, course):
    return

def deleteclass(uid, courseid):
    return

# Task DB Requests

def loadtasks(uid):
    return

def addtask(uid, task):
    return

def edittask(uid, task):
    return

def deletetask(uid, taskid):
    return

def loadschedule(uid, courseId):
    return

def addschedule(uid, schedule):
    return

def editschedule(uid, schedule):
    return

def deleteschedule(uid, schedule):
    return