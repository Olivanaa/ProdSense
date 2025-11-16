#include "mqtt.h"
#include <WiFi.h>
#include <PubSubClient.h>


const char* mqtt_server = "3.85.188.98";
const int mqtt_port = 1883;
const char* TOPIC_LUX         = "/TEF/device111/attrs/l";
const char* TOPIC_TEMPERATURE = "/TEF/device111/attrs/t";
const char* TOPIC_HUMIDITY    = "/TEF/device111/attrs/h";
const char* TOPIC_NOISE       = "/TEF/device111/attrs/n";
const char* TOPIC_AIR         = "/TEF/device111/attrs/a";
const char* TOPIC_PCI         = "/TEF/device111/attrs/p";
const char* ID_MQTT = "fiware_001"; 
const char* topicPrefix = "device111";

PubSubClient client;

void initMQTT(WiFiClient& espClient) {
  client.setClient(espClient);
  client.setServer(mqtt_server, mqtt_port);
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");
    if (client.connect(ID_MQTT)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("Falhou. rc=");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void sendData(
  float lightValue,
  float tempValue,
  float humValue,
  float noiseValue,
  float airValue,
  float pciValue
) {
  client.publish(TOPIC_LUX,         String(lightValue).c_str());
  client.publish(TOPIC_TEMPERATURE, String(tempValue).c_str());
  client.publish(TOPIC_HUMIDITY,    String(humValue).c_str());
  client.publish(TOPIC_NOISE,       String(noiseValue).c_str());
  client.publish(TOPIC_AIR,         String(airValue).c_str());
  client.publish(TOPIC_PCI,         String(pciValue).c_str());
}

void checkConnection() {
  if (!client.connected()) reconnectMQTT();
  client.loop();
}
