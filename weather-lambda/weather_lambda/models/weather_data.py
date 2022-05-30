from datetime import datetime, timedelta, timezone
from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, sql
from weather_lambda.models.base import Base


class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True)
    weather_code = Column(Integer, default=0)
    weather_text = Column(String(24), default="")
    rain_volume = Column(Float, default=0)
    temperature = Column(Float, default=0)
    datetime = Column(TIMESTAMP, server_default=sql.func.now())

    def __init__(self, weather_code, weather_text, rain_volume, temperature):
        self.weather_code = weather_code
        self.weather_text = weather_text
        self.rain_volume = rain_volume
        self.temperature = temperature
        self.datetime = self.hour_rounder(datetime.now(timezone.utc))

    def to_json(self):
        return {
            "id": self.id,
            "weather_code": self.weather_code,
            "weather_text": self.weather_text,
            "rain_volume": self.rain_volume,
            "temperature": self.temperature,
            "datetime": self.datetime.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def hour_rounder(self, t):
        return (t.replace(microsecond=0, second=0, minute=0, hour=t.hour)
                + timedelta(hours=t.minute//30))
