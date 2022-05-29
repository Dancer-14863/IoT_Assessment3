from node2_service.models.base import Base, Session, Engine
from node2_service.models.cover_state import CoverState
from node2_service.models.plant_cond import PlantCond


Base.metadata.create_all(Engine)
session = Session()

session.commit()
session.close()
