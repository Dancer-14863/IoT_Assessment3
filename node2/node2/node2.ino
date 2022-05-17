#include <NewPing.h>
#include <Servo.h>

// Pins
const int trigPin = 3;
const int echoPin = 2;
const int maxDistance = 5;
const int servoPin = 10;

// Ultrasonic sensor & servo motor
NewPing sonar(trigPin, echoPin, maxDistance);
Servo s;

// Commands
enum commands
{
  NO_COVER = 0,
  PARTIAL_COVER = 1,
  FULL_COVER = 2,
  GET_SENSOR_READING = 3,
};

void setup() {
  s.attach(servoPin);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    int command = Serial.read();
    switch (command)
    {
      case NO_COVER:
        s.write(0);
        break;
      case PARTIAL_COVER:
        s.write(45);
        break;
      case FULL_COVER:
        s.write(90);
        break;
      case GET_SENSOR_READING:
        Serial.println(getSensorReading());
        break;
    }
  }
}

int getSensorReading()
{
  int distance = sonar.ping_cm();
  return distance == 0 ? 0 : 1;
}
