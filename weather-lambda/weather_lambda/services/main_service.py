import json
import os
import requests
from weather_lambda.services.database_service import DatabaseService
from weather_lambda.services.mqtt_service import MQTTService


class MainService:
    database_service = None
    mqtt_service = None
    API_KEY = os.getenv("API_KEY")
    URL = f"https://api.openweathermap.org/data/2.5/weather?lat=1.5535&lon=110.3593&appid={API_KEY}&units=metric"

    def __init__(self, database_service: DatabaseService, mqtt_service: MQTTService):
        self.database_service = database_service
        self.mqtt_service = mqtt_service

    def run(self):
        # get weather data
        response = requests.get(self.URL).json()
        weather_code = response["weather"][0]["id"]
        weather_text = response["weather"][0]["main"]
        rain_volume = 0
        if ("rain" in response):
            rain_volume = response["rain"]["1h"]
        temperature = response["main"]["temp"]

        # store in rds
        weather_data = self.database_service.save_weather_data(
            weather_code, weather_text, rain_volume, temperature)

        # publish to MQTT
        self.mqtt_service.start()
        self.mqtt_service.set_base_topic("weather")
        self.__publish_weather_data(weather_data)
        self.mqtt_service.stop()

    def __publish_weather_data(self, weather_data):
        response_object = {
            "data": weather_data.to_json()
        }
        self.mqtt_service.publish(
            "latest", json.dumps(response_object))
