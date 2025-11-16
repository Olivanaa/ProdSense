#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"
#include <DHT.h>

class HumiditySensor : public SensorBase {
  private:
    DHT* dht;        // Ponteiro para o sensor DHT (umidade/temperatura)
    float humidity;  // Valor atual de umidade (%)
    String msg;      // Mensagem baseada no estado da umidade

  public:
    // Construtor recebe o objeto DHT já inicializado externamente
    HumiditySensor(DHT* d) : dht(d), humidity(0) {}

    // Lê a umidade, valida a leitura, classifica e gera mensagem
    void processValue() override {
      float h = dht->readHumidity(); // Leitura direta do DHT22

      // Se a leitura falhar, evita processar dados inválidos
      if (isnan(h)) {
        Serial.println("Erro no DHT22 (umidade)");
        return;
      }

      humidity = h; // Armazena o valor válido

      // Determina o estado da umidade segundo as faixas definidas
      State st = getHumidityState(humidity);

      // Seleciona a mensagem adequada ao estado atual
      msg =
        st == CRITICAL ? "Umidade perigosa. Usar umidificador." :
        st == POOR     ? "Umidade fora da zona de conforto." :
        st == MODERATE ? "Umidade moderada." :
        st == GOOD     ? "Umidade adequada." :
                         "Umidade ideal.";
    }

    // Retorna o valor numérico processado
    float getValue() override { return humidity; }

    // Retorna a mensagem associada ao estado da umidade
    String getMessage() override { return msg; }

    
    // Serialização opcional para JSON
    String getJson() override {
      return "{ \"value\": " + String(humidity) +
          ", \"msg\": \"" + msg + "\" }";
    }
};
