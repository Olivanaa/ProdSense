#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

class NoiseSensor : public SensorBase {
  private:
    int pin;        // Pino analógico onde o sensor de ruído está conectado.
    int noise;      // Valor convertido para uma escala de 0–100.
    String msg;     // Mensagem interpretada com base no estado.

  public:
    // Construtor inicializa o pino e zera o valor inicial.
    NoiseSensor(int pin) : pin(pin), noise(0) {}

    // Faz a leitura, normaliza para 0–100 e determina o estado.
    void processValue() override {
      int raw = analogRead(pin);  // Lê o valor bruto do ADC.

      // Converte para escala genérica. Simples, mas assume relação linear
      // — o que raramente é verdade em sensores de ruído. Isso funciona,
      // mas esconde uma imprecisão estrutural.
      noise = map(raw, 0, 4095, 0, 100);

      // Classifica usando a máquina de estados definida em states.h.
      State state = getNoiseState(noise);

      // Gera a mensagem correspondente ao estado. Funciona, mas cria acoplamento
      // duro entre lógica e texto, dificultando localização e padronização.
      msg = state == CRITICAL ? "Ruido muito alto!" :
            state == POOR     ? "Ruido ruim." :
            state == MODERATE ? "Ruido moderado." :
            state == GOOD     ? "Ruido adequado." :
                                "Silêncio ideal.";
    }

    // Retorna o valor numérico (0–100). Essencial para o MQTT.
    float getValue() override {
      return noise;
    }

    // Retorna a mensagem interpretada. Importante para debug ou dashboards.
    String getMessage() override {
      return msg;
    }

    
    // Serialização opcional para JSON
    String getJson() override {
      return "{ \"value\": " + String(noise) +
            ", \"msg\": \"" + msg + "\" }";
    }
};
