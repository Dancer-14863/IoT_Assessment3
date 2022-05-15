from node1_service.models.base import Base, Session, Engine
from node1_service.models.configuration import Configuration
from node1_service.models.sensor_log import SensorLog


Base.metadata.create_all(Engine)
session = Session()

# creates default configuration
configuration = Configuration(25, 75)

session.add(configuration)

session.commit()
session.close()