from weather_lambda.services.main_service import MainService
from weather_lambda.services.database_service import DatabaseService
from weather_lambda.services.mqtt_service import MQTTService
from dotenv import load_dotenv


def main(event=None, context=None):
    load_dotenv()
    database_service = DatabaseService()
    mqtt_service = MQTTService()
    main_service = MainService(database_service, mqtt_service)
    main_service.run()

    return "Lambda Function Invoked Successfully"
