from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, TIMESTAMP, sql
from node2_service.models.base import Base

class CoverState(Base):
    __tablename__ = "cover_state"
    
    id = Column(Integer, primary_key=True)
    state = Column(String(24), default="NO_COVER")
    recorded_at = Column(TIMESTAMP, server_default=sql.func.now(),)
    
    def __init__(self, state):
        self.state = state
        self.recorded_at = datetime.now(timezone.utc)
        
    def to_json(self):
        return {
            "id": self.id,
            "state": self.state,
            "recorded_at": self.recorded_at.strftime(
                "%Y-%m-%d %H:%M:%S"),
        }