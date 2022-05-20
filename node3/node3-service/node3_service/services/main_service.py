from node3_service.services.database_service import DatabaseService
from node3_service.utils.arduino_helpers import find_arduino, send_command_arduino
from node3_service.utils.commands import Commands
import serial
import time
import asyncio


class MainService:
    arduino = None
    database_service = None

    def __init__(self, database_service: DatabaseService):
        self.database_service = database_service

    def start(self):
        port = find_arduino()
        if port != None:
            print('Device detected at', port)

            with serial.Serial(port, 9600) as arduino:
                arduino.flush()
                if arduino.isOpen():
                    time.sleep(1)
                    print('Connected to device')
                    print('Node 3 Service is now running. Press CTRL-C to exit')
                    self.arduino = arduino
                    loop = asyncio.get_event_loop()
                    try:
                        loop.run_until_complete(self.__main_process())
                    except:
                        loop.run_until_complete(loop.shutdown_asyncgens())
                        loop.close()
                        print('Exiting program')
                else:
                    print('Could not connect to device')
        else:
            print('No device detected. Exiting program')

    async def __main_process(self):
        while True:
            await asyncio.sleep(5)
            send_command_arduino(self.arduino, Commands.ACTIVATE_WATER_PUMP)
            self.database_service.save_water_pump_log(1)
            await asyncio.sleep(5)
            send_command_arduino(self.arduino, Commands.DEACTIVATE_WATER_PUMP)
            self.database_service.save_water_pump_log(0)
            
