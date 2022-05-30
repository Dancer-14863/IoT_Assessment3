from weather_lambda.models.base import Session
from weather_lambda.models.weather_data import WeatherData


class DatabaseService:
    session = Session()

    def save_weather_data(self, weather_code, weather_text, rain_volume, temperature):
        weather_data = WeatherData(
            weather_code, weather_text, rain_volume, temperature)
        self.session.add(weather_data)
        self.session.flush()
        self.commit_session()
        self.session.refresh(weather_data)
        return weather_data

    def commit_session(self):
        self.session.commit()
