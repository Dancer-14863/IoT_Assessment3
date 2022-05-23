from node3_service.models.base import Base, Session, Engine
from node3_service.models.water_pump_log import WaterPumpLog
from node3_service.models.configuration import Configuration


Base.metadata.create_all(Engine)
session = Session()

configuration = Configuration(1)
session.add(configuration)

session.commit()
session.close()