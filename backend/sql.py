import sqlalchemy as db
import os

engine = db.create_engine("sqlite:///backend/app.db")

conn = engine.connect() 
metadata = db.MetaData()

Student = db.Table('Student', metadata,
              db.Column('Id', db.String(255),primary_key=True),
              db.Column('Name', db.String(255)),
              db.Column('Major', db.String(255))
              )

Class = db.Table('Class', metadata,
            db.Column('Id', db.Integer() , primary_key=True),
            db.Column('Name', db.String(255)),
            db.Column('Code', db.String(255)),
            db.Column('Professor', db.String(255)),
            db.Column('Location', db.String(255))
                 )

# Schedule = db.Table('Table', metadata,
                    
#                     )

# Tasks = db.Table('Tasks', metadata,
                    
#                     )



metadata.create_all(engine) 