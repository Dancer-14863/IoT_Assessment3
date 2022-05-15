from node1_service.services.main_service import MainService
from node1_service.services.database_service import DatabaseService


def start():
    database_service = DatabaseService()
    main_service = MainService(database_service)
    main_service.start()
