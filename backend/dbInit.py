import sqlalchemy as db

engine = db.create_engine("sqlite:///backend/app.db")

conn = engine.connect() 
metadata = db.MetaData()

Student = db.Table('Student', metadata,
              db.Column('Id', db.String(255),primary_key=True),
              db.Column('Name', db.String(255)),
              db.Column('Major', db.String(255))
              )

Class = db.Table('Class', metadata,
            db.Column('id', db.Integer() , primary_key=True),
            db.Column('uid', db.String(255), db.ForeignKey("Student.Id")),
            db.Column('name', db.String(255)),
            db.Column('code', db.String(255)),
            db.Column('professor', db.String(255)),
            db.Column('location', db.String(255))
                 )

# Schedule = db.Table('Table', metadata,
                    
#                     )

# Tasks = db.Table('Tasks', metadata,
                    
#                     )



metadata.create_all(engine) 