from node1_service.models.base import Session
from node1_service.models.sensor_log import SensorLog
from node1_service.models.configuration import Configuration


class DatabaseService:
    session = Session()

    def save_sensor_reading(self, reading, status):
        sensor_log = SensorLog(reading, status)
        self.session.add(sensor_log)
        self.session.flush()
        self.commit_session()
        self.session.refresh(sensor_log)
        return sensor_log
    
    def get_latest_configuration(self):
        return self.session.query(Configuration).order_by(Configuration.id.desc()).first()
        
    def commit_session(self):
        self.session.commit()



