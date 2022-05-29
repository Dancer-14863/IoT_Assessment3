from datetime import datetime, timezone
from email.policy import default
from sqlalchemy import Column, Integer, String, TIMESTAMP, sql
from node1_service.models.base import Base


class SensorLog(Base):
    __tablename__ = 'sensor_logs'

    id = Column(Integer, primary_key=True)
    sensor_reading = Column(Integer, default=0)
    status = Column(String(24), default='NORMAL')
    recorded_at = Column(TIMESTAMP, server_default=sql.func.now(),)

    def __init__(self, sensor_reading, status):
        self.sensor_reading = sensor_reading
        self.status = status
        self.recorded_at = datetime.now(timezone.utc)

    def to_json(self):
        return {
            'id': self.id,
            'sensor_reading': self.sensor_reading,
            'status': self.status,
            'recorded_at': self.recorded_at.strftime(
                '%Y-%m-%d %H:%M:%S'),
        }
