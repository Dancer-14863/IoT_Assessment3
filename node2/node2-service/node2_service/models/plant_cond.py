from sqlalchemy import Column, Integer, TIMESTAMP, sql
from node2_service.models.base import Base

class PlantCond(Base):
    __tablename__ = "plant_cond"
    
    id = Column(Integer, primary_key=True)
    cond = Column(Integer, default=0)
    timestamp = Column(TIMESTAMP, server_default=sql.func.now(),)
    
    def __init__(self, cond):
        self.cond = cond