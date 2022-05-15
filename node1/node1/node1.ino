#define analogSensorPin A0

const int ledPin = 7;

enum commands
{
  ACTIVATE_LED = 0,
  DEACTIVATE_LED = 1,
  GET_SENSOR_READING = 2,
};

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0)
  {
    int command = Serial.read();
    switch (command)
    {
      case ACTIVATE_LED:
        digitalWrite(ledPin, HIGH);
        break;
      case DEACTIVATE_LED:
        digitalWrite(ledPin, LOW);
        break;
      case GET_SENSOR_READING:
        Serial.println(getSensorReading());
        break;
    }
  }
}

int getSensorReading()
{
  int data = analogRead(analogSensorPin);
  return map(data, 0, 1023, 0, 100);
}
