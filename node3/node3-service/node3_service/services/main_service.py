from node3_service.services.database_service import DatabaseService
from node3_service.utils.arduino_helpers import find_arduino, send_command_arduino
from node3_service.services.mqtt_service import MQTTService
from node3_service.utils.commands import Commands
from datetime import datetime, timezone
import json
import serial
import time
import asyncio


class MainService:
    arduino = None
    database_service = None
    mqtt_service = None
    configuration = None

    device_id = '0003'
    service_start_date_time = datetime.now(timezone.utc)

    is_water_pump_on = False
    litres_to_pump = 0.0
    seconds_to_pump = 0

    def __init__(self, database_service: DatabaseService, mqtt_service: MQTTService):
        self.database_service = database_service
        self.mqtt_service = mqtt_service

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

                    self.__get_configuration()
                    self.__init_subscriptions()
                    self.mqtt_service.start()
                    loop = asyncio.get_event_loop()
                    try:
                        loop.run_until_complete(self.__main_process())
                    except:
                        loop.run_until_complete(loop.shutdown_asyncgens())
                        loop.close()
                        self.mqtt_service.stop()
                        print('Exiting program')
                else:
                    print('Could not connect to device')
        else:
            print('No device detected. Exiting program')

    async def __main_process(self):
        while True:
            if (self.is_water_pump_on):
                send_command_arduino(
                    self.arduino, Commands.ACTIVATE_WATER_PUMP)
                await asyncio.sleep(self.seconds_to_pump)
                water_pump_log = self.database_service.save_water_pump_log(
                    self.litres_to_pump, self.seconds_to_pump)
                send_command_arduino(
                    self.arduino, Commands.DEACTIVATE_WATER_PUMP)
                self.__publish_water_pump_log(water_pump_log)
                self.is_water_pump_on = False

    def __get_configuration(self):
        self.configuration = self.database_service.get_latest_configuration()

    def __init_subscriptions(self):
        self.mqtt_service.set_base_subscription('node3')
        self.mqtt_service.add_message_callback(
            'get-status', self.__status_callback)
        self.mqtt_service.add_message_callback(
            'update-configuration', self.__configuration_callback)
        self.mqtt_service.add_message_callback(
            'water-pump-commands', self.__water_pump_commands_callback)

    def __status_callback(self, client, user_data, message):
        self.__publish_status()

    def __configuration_callback(self, client, user_data, message):
        parsed_payload = json.loads(message.payload.decode('utf-8'))
        self.configuration.litre_per_min = parsed_payload['data']['litre_per_min']
        self.database_service.commit_session()

    def __publish_status(self):
        date_time_string = self.service_start_date_time.strftime(
            '%Y-%m-%d %H:%M:%S')
        response_object = {
            'data': {
                'device_id': self.device_id,
                'up_date_time': date_time_string,
                'status': 'UP',
            }
        }
        self.mqtt_service.publish('status', json.dumps(response_object))

    def __water_pump_commands_callback(self, client, user_data, message):
        parsed_payload = json.loads(message.payload.decode('utf-8'))
        self.litres_to_pump = float(parsed_payload['data']['litres_to_pump'])
        self.seconds_to_pump = (self.litres_to_pump /
                                self.configuration.litre_per_min) * 60

        if (self.is_water_pump_on):
            self.__publish_error_notification()
        else:
            self.is_water_pump_on = True

    def __publish_error_notification(self):
        response_object = {
            'data': {
                'message': 'Water Pump is already pumping!',
            }
        }
        self.mqtt_service.publish(
            'notifications/error', json.dumps(response_object))

    def __publish_water_pump_log(self, water_pump_log):
        response_object = {
            'data': water_pump_log.to_json()
        }
        self.mqtt_service.publish(
            'notifications/logs', json.dumps(response_object))
