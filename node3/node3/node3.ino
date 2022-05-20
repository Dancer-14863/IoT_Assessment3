int relayPin = 8;

enum commands
{
  TURN_OFF = 0,
  TURN_ON = 1,
};

void setup() {
  // put your setup code here, to run once:
  pinMode(relayPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0)
  { 
    int command = Serial.read();

    switch (command)
    {
      case TURN_OFF:
        digitalWrite(relayPin, HIGH);
        break;
      case TURN_ON:
        digitalWrite(relayPin, LOW);
        break;
    }
  }

}
