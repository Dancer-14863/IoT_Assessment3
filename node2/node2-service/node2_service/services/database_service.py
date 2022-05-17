from node2_service.models.base import Session
from node2_service.models.plant_cond import PlantCond
from node2_service.models.cover_state import CoverState

class DatabaseService:
    def save_plant_cond(self, condition):
        session = Session()
        plant_cond = PlantCond(condtion)
        session.add(plant_cond)
        session.commit()
        session.close()
        
    def save_cover_state(self, state):
        session = Session()
        cover_state = CoverState(state)
        session.add(cover_state)
        session.commit()
        session.close()
        