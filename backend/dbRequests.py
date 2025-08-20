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


    