from datetime import datetime
import json
from node2_service.services.database_service import DatabaseService
from node2_service.services.mqtt_service import MQTTService
from node2_service.utils.arduino_helpers import find_arduino, send_command_arduino, make_transaction
from node2_service.utils.commands import Commands
import serial
import time
import asyncio


class MainService:
    arduino = None
    database_service = None
    mqtt_service = None
    last_recorded_sensor_log = None

    device_id = "0002"
    service_start_date_time = datetime.now()

    def __init__(self, database_service: DatabaseService, mqtt_service: MQTTService):
        self.database_service = database_service
        self.mqtt_service = mqtt_service

    def start(self):
        port = find_arduino()
        if port != None:
            print("Device detected at", port)

            with serial.Serial(port, 9600) as arduino:
                arduino.flush()
                if arduino.isOpen():
                    time.sleep(1)
                    print("Connected to device")
                    print("Node 2 Service is now running. Press CTRL-C to exit")
                    self.arduino = arduino

                    self.__init_subscriptions()
                    self.mqtt_service.start()

                    loop = asyncio.get_event_loop()

                    try:
                        loop.run_until_complete(self.__main_process())
                    except:
                        loop.run_until_complete(loop.shutdown_asyncgens())
                        loop.close()
                        self.mqtt_service.stop()
                        print("Exiting Program")
                else:
                    print("Could not connect to device")
        else:
            print("No device detected. Exiting program")

    async def __main_process(self):
        while True:
            await asyncio.sleep(10)
            self.__get_sensor_reading()

    def __init_subscriptions(self):
        self.mqtt_service.set_base_subscription("node2")
        self.mqtt_service.add_message_callback(
            "get-status", self.__status_callback)
        self.mqtt_service.add_message_callback(
            "cover-commands", self.__cover_state_callback)

    def __get_sensor_reading(self):
        sensor_reading = int(make_transaction(
            self.arduino, Commands.GET_SENSOR_READING))

        status = "NORMAL"
        if (sensor_reading != 0):
            status = "OVER"

        self.last_recorded_sensor_log = self.database_service.save_plant_cond_log(
            sensor_reading, status)

        if (self.last_recorded_sensor_log.status != "NORMAL"):
            self.__publish_sensor_log(self.last_recorded_sensor_log)

        print(f"Sensor Reading: {sensor_reading}")

    def __status_callback(self, client, user_data, message):
        self.__publish_status()

    def __cover_state_callback(self, client, user_data, message):
        parsed_payload = json.loads(message.payload.decode("utf-8"))
        received_command = parsed_payload["data"]["cover_command"]

        self.__get_sensor_reading()
        if (self.last_recorded_sensor_log is None or
                (self.last_recorded_sensor_log is not None
                 and self.last_recorded_sensor_log.status == "NORMAL")):
            command = Commands.NO_COVER
            if (received_command == "PARTIAL_COVER"):
                command = Commands.PARTIAL_COVER
            elif (received_command == "FULL_COVER"):
                command = Commands.FULL_COVER
            elif (received_command == "NO_COVER"):
                command = Commands.NO_COVER

            cover_state = self.database_service.save_cover_state(
                received_command)
            send_command_arduino(self.arduino, command)
            self.__publish_cover_state(cover_state)
        else:
            self.__publish_error_notification()

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
            'notifications/height', json.dumps(response_object))

    def __publish_cover_state(self, cover_state):
        response_object = {
            "data": cover_state.to_json()
        }
        self.mqtt_service.publish(
            "notifications/cover", json.dumps(response_object))

    def __publish_error_notification(self):
        response_object = {
            "message": "Cannot switch cover modes. Blocked by plant!"
        }
        self.mqtt_service.publish(
            "notifications/error", json.dumps(response_object))
