import sqlalchemy as db

engine = db.create_engine("sqlite:///backend/app.db")

conn = engine.connect() 
metadata = db.MetaData()

User = db.Table('User', metadata,
              db.Column('Id', db.String(255),primary_key=True),
              db.Column('Name', db.String(255)),
              db.Column('Major', db.String(255)),
              db.Column('School', db.String(255))
              )

Class = db.Table('Class', metadata,
            db.Column('id', db.Integer() , primary_key=True),
            db.Column('uid', db.String(255), db.ForeignKey("User.Id")),
            db.Column('name', db.String(255)),
            db.Column('code', db.String(255)),
            db.Column('professor', db.String(255)),
            db.Column('location', db.String(255))
                 )

Schedule = db.Table('Schedule', metadata,
               db.Column('id', db.Integer, primary_key=True),
               db.Column('uid', db.String(255), db.ForeignKey("User.Id")),   
               db.Column('course_id', db.Integer, db.ForeignKey("Class.id", ondelete="CASCADE")),
               db.Column('type', db.String(255)),       # "Lecture", "Lab", etc.
               db.Column('days', db.String(255)),       # store as comma-separated: "Mon,Wed,Fri"
               db.Column('startTime', db.String(50)),   
               db.Column('endTime', db.String(50))      
)


Tasks = db.Table(
    'Tasks', metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('uid', db.String(255), db.ForeignKey("User.Id")),    
    db.Column('courseId', db.Integer, db.ForeignKey("Class.id")),     
    db.Column('title', db.String(255)),
    db.Column('startDate', db.String(50)),   
    db.Column('dueDate', db.String(50)),     
    db.Column('calendarcheck', db.Boolean)   
)



metadata.create_all(engine) 