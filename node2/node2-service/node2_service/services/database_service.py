from node2_service.models.base import Session
from node2_service.models.plant_cond import PlantCond
from node2_service.models.cover_state import CoverState

class DatabaseService:
    session = Session()
    
    def save_plant_cond_log(self, reading, status):
        plant_cond = PlantCond(reading, status)
        self.session.add(plant_cond)
        self.session.flush()
        self.commit_session()
        self.session.refresh(plant_cond)
        return plant_cond
        
    def save_cover_state(self, state):
        cover_state = CoverState(state)
        self.session.add(cover_state)
        self.commit_session()
        self.session.refresh(cover_state)
        return cover_state
        
    def commit_session(self):
        self.session.commit()