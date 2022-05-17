from enum import Enum

class Commands(Enum):
    NO_COVER = 0,
    PARTIAL_COVER = 1,
    FULL_COVER = 2,
    GET_SENSOR_READING = 3,
