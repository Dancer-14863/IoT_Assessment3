from xmlrpc.client import Boolean
from sqlalchemy import Column, Integer, TIMESTAMP, sql
from node3_service.models.base import Base


class WaterPumpLog(Base):
    __tablename__ = 'water_pump_logs'

    id = Column(Integer, primary_key=True)
    water_pump_status = Column(Integer, default=0)
    recorded_at = Column(TIMESTAMP, server_default=sql.func.now(),)

    def __init__(self, water_pump_status):
        self.water_pump_status = water_pump_status