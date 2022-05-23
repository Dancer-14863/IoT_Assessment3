from paho import mqtt
import os
import paho.mqtt.client as paho


class MQTTService:
    base_topic = ''
    client = None

    def __init__(self):
        self.__connect()

    def start(self):
        self.client.loop_start()

    def stop(self):
        self.client.loop_stop()

    def set_base_subscription(self, topic):
        self.base_topic = topic
        self.client.subscribe(self.__get_full_topic('#'))

    def add_message_callback(self, topic, callback):
        self.client.message_callback_add(
            self.__get_full_topic(topic), callback)

    def publish(self, topic, payload):
        self.client.publish(self.__get_full_topic(topic), payload)

    def __connect(self):
        broker = os.getenv('MQTT_BROKER')
        port = int(os.getenv('MQTT_PORT'))
        username = os.getenv('MQTT_USERNAME')
        password = os.getenv('MQTT_PASSWORD')
        client_id = 'node3-connection'

        self.client = paho.Client(client_id)
        self.client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
        self.client.username_pw_set(username, password)

        self.client.connect(broker, port)

    def __get_full_topic(self, sub_topic):
        return f'{self.base_topic}/{sub_topic}'