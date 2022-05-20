from node3_service.models.base import Session
from node3_service.models.water_pump_log import WaterPumpLog


class DatabaseService:
    def save_water_pump_log(self, status):
        session = Session()
        water_pump_log = WaterPumpLog(status)
        session.add(water_pump_log)
        session.commit()
        session.close()



