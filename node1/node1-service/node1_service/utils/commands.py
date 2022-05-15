from enum import Enum


class Commands(Enum):
    ACTIVATE_LED = 0,
    DEACTIVATE_LED = 1,
    GET_SENSOR_READING = 2,
