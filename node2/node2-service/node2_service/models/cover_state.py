from sqlalchemy import Column, Integer, TIMESTAMP, sql
from node2_service.models.base import Base

class CoverState(Base):
    __tablename__ = "cover_state"
    
    id = Column(Integer, primary_key=True)
    state = Column(Integer, default=0)
    timestamp = Column(TIMESTAMP, server_default=sql.func.now(),)
    
    def __init__(self, state):
        self.state = state