from weather_lambda.models.base import Base, Session, Engine
from weather_lambda.models.weather_data import WeatherData


Base.metadata.create_all(Engine)
session = Session()

session.commit()
session.close()