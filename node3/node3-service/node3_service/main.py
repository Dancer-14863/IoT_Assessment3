from node3_service.services.main_service import MainService
from node3_service.services.database_service import DatabaseService
from node3_service.services.mqtt_service import MQTTService
from dotenv import load_dotenv

def start():
    load_dotenv()
    database_service = DatabaseService()
    mqtt_service = MQTTService()
    main_service = MainService(database_service, mqtt_service)
    main_service.start()

if __name__ == "__main__":
   start()