from json import tool
from time import sleep
from serial.tools import list_ports
from node3_service.utils.commands import Commands
import serial
import asyncio


def find_arduino():
    port = None
    ports = serial.tools.list_ports.comports()
    for p in ports:
        if p.manufacturer is not None and "Arduino" in p.manufacturer:
            port = p.device
    return port


def send_command_arduino(arduino, command):
    arduino.write(bytes(command.value))

