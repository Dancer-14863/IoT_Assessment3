from node1_service.models.base import Session
from node1_service.models.sensor_log import SensorLog


class DatabaseService:
    def save_sensor_reading(self, reading):
        session = Session()
        sensor_log = SensorLog(reading)
        session.add(sensor_log)
        session.commit()
        session.close()



