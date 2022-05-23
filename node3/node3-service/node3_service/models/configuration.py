from sqlalchemy import Column, Integer  
from node3_service.models.base import Base


class Configuration(Base):
    __tablename__ = 'configuration'

    id = Column(Integer, primary_key=True)
    litre_per_min = Column(Integer, default=1)

    def __init__(self, litre_per_min):
        self.litre_per_min = litre_per_min