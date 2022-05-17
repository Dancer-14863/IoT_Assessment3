import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()
database = os.getenv('DB_NAME')
username = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
db_url = os.getenv('DB_URL')
url = f'mysql+pymysql://{username}:{password}@{db_url}/{database}'

Engine = create_engine(url)
Session = sessionmaker(bind=Engine)
Base = declarative_base()