from node3_service.models.base import Base, Session, Engine
from node3_service.models.water_pump_log import WaterPumpLog


Base.metadata.create_all(Engine)
session = Session()

session.commit()
session.close()