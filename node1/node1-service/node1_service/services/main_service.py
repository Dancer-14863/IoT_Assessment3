from datetime import datetime
import json
from node1_service.services.database_service import DatabaseService
from node1_service.services.mqtt_service import MQTTService
from node1_service.utils.arduino_helpers import find_arduino, send_command_arduino, make_transaction
from node1_service.utils.commands import Commands
import serial
import time
import asyncio


class MainService:
    arduino = None
    database_service = None
    mqtt_service = None
    configuration = None

    #  Hardcoded device information
    device_id = '0001'
    service_start_date_time = datetime.now()

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
                    print('Node 1 Service is now running. Press CTRL-C to exit')
                    self.arduino = arduino
                    send_command_arduino(arduino, Commands.ACTIVATE_LED)

                    self.__get_configuration()
                    self.__init_subscriptions()
                    self.mqtt_service.start()

                    loop = asyncio.get_event_loop()
                    try:
                        loop.run_until_complete(self.__main_process())
                    except:
                        send_command_arduino(arduino, Commands.DEACTIVATE_LED)
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
            await asyncio.sleep(10)

            sensor_reading = int(make_transaction(
                self.arduino, Commands.GET_SENSOR_READING))
            status = 'NORMAL'
            if (sensor_reading < self.configuration.min_threshold):
                status = 'BELOW THRESHOLD'
            elif (sensor_reading > self.configuration.max_threshold):
                status = 'ABOVE THRESHOLD'
            sensor_log = self.database_service.save_sensor_reading(
                sensor_reading, status)

            if (sensor_log.status != 'NORMAL'):
                self.__publish_sensor_log(sensor_log)

            print(f'Sensor Reading: {sensor_reading}')

    def __get_configuration(self):
        self.configuration = self.database_service.get_latest_configuration()

    def __init_subscriptions(self):
        self.mqtt_service.set_base_subscription('node1')
        self.mqtt_service.add_message_callback(
            'get-status', self.__status_callback)
        self.mqtt_service.add_message_callback(
            'update-configuration', self.__configuration_callback)

    def __status_callback(self, client, user_data, message):
        self.__publish_status()

    def __configuration_callback(self, client, user_data, message):
        parsed_payload = json.loads(message.payload.decode('utf-8'))
        self.configuration.min_threshold = parsed_payload['data']['min_threshold']
        self.configuration.max_threshold = parsed_payload['data']['max_threshold']
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

    def __publish_sensor_log(self, sensor_log):
        response_object = {
            'data': sensor_log.to_json(),
        }
        self.mqtt_service.publish(
            'notifications/logs', json.dumps(response_object))
