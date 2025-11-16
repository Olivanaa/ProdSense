#ifndef MQTT_HANDLER_H
#define MQTT_HANDLER_H

#include <WiFi.h> 
#include <PubSubClient.h>

// Declarações "extern" significam que as variáveis são definidas em outro .cpp.
// Isso funciona, mas espalha responsabilidade: qualquer arquivo pode alterar esses valores.
// Para código crítico de IoT, isso costuma gerar bugs difíceis de rastrear.
extern const char* ID_MQTT;
extern const char* MQTT_BROKER;
extern const int   MQTT_PORT;

// Cliente MQTT global.
// Funciona, mas cria acoplamento forte entre módulos.
// Você perde possibilidade de mock, teste, multi-instância etc.
extern PubSubClient client;

// Inicializa o cliente com o WiFiClient usado como transporte.
// Aqui você delega a conexão do WiFi para quem chama, o que é bom,
// mas também significa que sua função depende do estado externo corretamente preparado.
void initMQTT(WiFiClient& espClient);

// Garante reconexão com o broker caso a conexão caia.
// O nome é bom, mas a implementação é bloqueante (no .cpp que você mostrou antes),
// o que significa que sua aplicação pode travar até o broker voltar.
void reconnectMQTT();

// Publica todos os dados em tópicos separados.
// É simples, mas custa caro em overhead e pode perder consistência se uma parte falhar.
void sendData(
  float lightValue,
  float tempValue,
  float humValue,
  float noiseValue,
  float airValue,
  float pciValue
);

// Mantém a conexão viva e processa o loop MQTT.
// Necessário para manter conexão TCP ativa.
void checkConnection();

#endif 
