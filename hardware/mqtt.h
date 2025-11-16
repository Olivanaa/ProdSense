#ifndef MQTT_HANDLER_H
#define MQTT_HANDLER_H

#include <WiFi.h> 
#include <PubSubClient.h>

extern const char* ID_MQTT;
extern const char* MQTT_BROKER;
extern const int   MQTT_PORT;

extern PubSubClient client;

void initMQTT(WiFiClient& espClient);
void reconnectMQTT();
void sendData(
  float lightValue,
  float tempValue,
  float humValue,
  float noiseValue,
  float airValue,
  float pciValue
);
void checkConnection();
#endif 