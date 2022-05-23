from sqlalchemy import Column, Integer, Numeric, TIMESTAMP, sql
from node3_service.models.base import Base


class WaterPumpLog(Base):
    __tablename__ = 'water_pump_logs'

    id = Column(Integer, primary_key=True)
    pumped_litres = Column(Integer, default=0)
    pump_duration = Column(Integer, default=0)
    recorded_at = Column(TIMESTAMP, server_default=sql.func.now())

    def __init__(self, pumped_litres, pump_duration):
        self.pumped_litres = pumped_litres
        self.pump_duration = pump_duration

    def to_json(self):
        return {
            'id': self.id,
            'pumped_litres': self.pumped_litres,
            'pumped_duration': self.pump_duration,
            'recorded_at': self.recorded_at.strftime(
                "%Y-%m-%d %H:%M:%S")
        }
