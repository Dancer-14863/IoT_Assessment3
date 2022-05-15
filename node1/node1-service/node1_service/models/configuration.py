from sqlalchemy import Column, Integer  
from node1_service.models.base import Base


class Configuration(Base):
    __tablename__ = 'configuration'

    id = Column(Integer, primary_key=True)
    min_threshold = Column(Integer, default=25)
    max_threshold = Column(Integer, default=75)

    def __init__(self, min_threshold, max_threshold):
        self.min_threshold = min_threshold
        self.max_threshold = max_threshold
