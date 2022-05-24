from email.policy import default
from sqlalchemy import Column, Integer, String, Float, sql
from weather_lambda.models.base import Base


class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True)
    weather_text = Column(String(24), default="")
    rain_volume = Column(Integer, default=0)
    temperature = Column(Float, default=0)

    def __init__(self, weather_text, rain_volume, temperature):
        self.weather_text = weather_text
        self.rain_volume = rain_volume
        self.temperature = temperature

    def to_json(self):
        return {
            "id": self.id,
            "weather_text": self.weather_text,
            "rain_volume": self.rain_volume,
            "temperature": self.temperature,
        }
