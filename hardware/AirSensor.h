#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

class AirSensor : public SensorBase {
  private:
    int pin;     // Pino analógico onde o sensor está conectado
    int air;     // Valor processado da qualidade do ar (0 a 100)
    String msg;  // Mensagem textual baseada no estado da qualidade do ar

  public:
    // Construtor recebe o pino e inicializa valores
    AirSensor(int pin) : pin(pin), air(0) {}

    // Lê o valor bruto do sensor e o converte para um range útil (0–100)
    // Depois classifica esse valor em um estado e gera uma mensagem adequada
    void processValue() override {
      int raw = analogRead(pin); // Leitura bruta (0–4095 no ESP32)

      // Normaliza o valor bruto para porcentagem
      air = map(raw, 0, 4095, 0, 100);

      // Determina o estado da qualidade do ar
      State state = getAirState(air);

      // Associa mensagem ao estado
      msg = state == CRITICAL ? "Ar muito ruim!" :
            state == POOR     ? "Qualidade do ar baixa." :
            state == MODERATE ? "Ar moderado." :
            state == GOOD     ? "Ar bom." :
                                "Ar excelente.";
    }

    // Retorna o valor processado da qualidade do ar
    float getValue() override {
      return air;
    }

    // Retorna a mensagem baseada no estado atual
    String getMessage() override {
      return msg;
    }

    
    // Serialização opcional para JSON
    String getJson() override {
      return "{ \"value\": " + String(air) +
          ", \"msg\": \"" + msg + "\" }";
    }
    
};
