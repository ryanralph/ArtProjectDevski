#include "application.h"
#define ECHOPIN 2// Pin to receive echo pulse
#define TRIGPIN 3// Pin to send trigger pulse
#define LED D7
int sensorState = 0,
    locationId = 0;
int distance = 0;

void setup() {
    pinMode(LED, OUTPUT);  
    pinMode(ECHOPIN, INPUT);
    pinMode(TRIGPIN, OUTPUT);
    pinMode(D7, OUTPUT);
}

void loop() {
    ping();
  if(distance < 50) {
      sensorState = 1;
  } else {
      sensorState = 0;
  }
  digitalWrite(LED, sensorState);
  delay(5000);
  String data = String::format(
  "{\"locationId\":%i, \"SensorState\":%i}",
  locationId, sensorState);
  Particle.publish("doTheThing", data, PRIVATE);
}

void ping(){
    digitalWrite(TRIGPIN, LOW); // Set the trigger pin to low for 2uS
    delayMicroseconds(2);
    digitalWrite(TRIGPIN, HIGH); // Send a 10uS high to trigger ranging
    delayMicroseconds(10);
    digitalWrite(TRIGPIN, LOW); // Send pin low again
    distance = pulseIn(ECHOPIN, HIGH); // Read in times pulse
    distance= distance/58;
    delay(50);// Wait 50mS before next ranging
}
