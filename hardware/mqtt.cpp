#include "mqtt.h"
#include <WiFi.h>
#include <PubSubClient.h>

// Endereço do broker MQTT e porta usada.
// Aqui você está usando um IP fixo — isso cria dependência rígida e dificulta manutenção.
const char* mqtt_server = "3.85.188.98";
const int mqtt_port = 1883;

// Tópicos individuais para cada atributo enviado ao FIWARE.
// O padrão "/TEF/device111/attrs/<x>" segue o protocolo IoT Agent.
const char* TOPIC_LUX         = "/TEF/device111/attrs/l";
const char* TOPIC_TEMPERATURE = "/TEF/device111/attrs/t";
const char* TOPIC_HUMIDITY    = "/TEF/device111/attrs/h";
const char* TOPIC_NOISE       = "/TEF/device111/attrs/n";
const char* TOPIC_AIR         = "/TEF/device111/attrs/a";
const char* TOPIC_PCI         = "/TEF/device111/attrs/p";

// ID usado para identificar o dispositivo no broker.
// Se você conectar mais de um ESP com o mesmo ID, vai causar conflitos.
const char* ID_MQTT = "fiware_001"; 

// Prefixo de tópicos usado pelo IoT Agent (neste caso, não está sendo usado no código).
const char* topicPrefix = "device111";

// Objeto global do PubSubClient (MQTT).
// Ele depende de um WiFiClient passado no setup.
PubSubClient client;

// Inicializa o cliente MQTT configurando o WiFiClient e o servidor.
// Sem callback definido, você não recebe mensagens — só publica.
void initMQTT(WiFiClient& espClient) {
  client.setClient(espClient);
  client.setServer(mqtt_server, mqtt_port);
}

// Mantém o ESP conectado ao broker.
// O loop bloqueante aqui significa que se o broker estiver offline,
// o setup vai travar alguns segundos repetidamente até conectar.
void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");
    if (client.connect(ID_MQTT)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("Falhou. rc=");
      Serial.print(client.state());  // Códigos de erro do MQTT ajudam no debug.
      delay(2000);
    }
  }
}

// Publica todos os atributos coletados pelos sensores.
// Cada publish é independente — se um falhar, você não tem tratamento de erro.
// Seria mais consistente juntar tudo num JSON e enviar uma única mensagem.
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

// Garante que o cliente esteja conectado e processa o loop MQTT.
// Sem isso, o publish funciona, mas a conexão cairia rapidamente.
void checkConnection() {
  if (!client.connected()) reconnectMQTT();
  client.loop();
}
