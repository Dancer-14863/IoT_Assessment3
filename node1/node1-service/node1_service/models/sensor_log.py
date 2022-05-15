from sqlalchemy import Column, Integer, TIMESTAMP, sql
from node1_service.models.base import Base


class SensorLog(Base):
    __tablename__ = 'sensor_logs'

    id = Column(Integer, primary_key=True)
    sensor_reading = Column(Integer, default=0)
    reacord_at = Column(TIMESTAMP, server_default=sql.func.now(),)

    def __init__(self, sensor_reading):
        self.sensor_reading = sensor_reading