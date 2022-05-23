from node3_service.models.base import Session
from node3_service.models.water_pump_log import WaterPumpLog
from node3_service.models.configuration import Configuration


class DatabaseService:
    session = Session()

    def save_water_pump_log(self, status):
        water_pump_log = WaterPumpLog(status)
        self.session.add(water_pump_log)
        self.session.flush()
        self.commit_session()
        self.session.refresh(water_pump_log)
        return water_pump_log

    def get_latest_configuration(self):
        return self.session.query(Configuration).order_by(Configuration.id.desc()).first()

    def commit_session(self):
        self.session.commit()
