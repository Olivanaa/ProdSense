#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

// Converte um valor de iluminância (lux) para uma nota de 0 a 100,
// usando faixas progressivas e regressivas conforme conforto visual.
// O comportamento não é linear — você cria "zonas" de conforto e desconforto.
int luxToScore(float lux) {
  if (lux < 20) return 0;
  if (lux < 100) return map(lux, 20, 100, 10, 40);
  if (lux < 200) return map(lux, 100, 200, 40, 60);
  if (lux < 350) return map(lux, 200, 350, 60, 80);
  if (lux < 650) return map(lux, 350, 650, 80, 100);
  if (lux < 800) return map(lux, 650, 800, 100, 60);
  if (lux < 1200) return map(lux, 800, 1200, 60, 40);
  if (lux < 5000) return map(lux, 1200, 5000, 40, 10);
  return 0;
}

class LightSensor : public SensorBase {
  private:
    int pin;                  // Pino analógico do LDR
    float voltage;            // Tensão convertida da leitura
    float resistance;         // Resistência calculada do LDR
    float lux;                // Iluminância estimada
    float logLux;             // Log10 do lux — usado para normalização perceptual
    float normalizedLux;      // Lux normalizado para escala 0–100
    String msg;               // Mensagem baseada no estado
    const float GAMMA = 0.7;  // Constante do LDR (depende do modelo)
    const float RL10 = 50.0;  // Resistência do LDR a 10 lux

  public:
    // Armazena o pino e zera o lux inicial
    LightSensor(int pin) : pin(pin), lux(0) {}

    // Processa a leitura analógica, converte para luz, normaliza e classifica
    void processValue() override {
      int raw = analogRead(pin); // Leitura bruta do ESP32 (0–4095)

      // Converte leitura para tensão assumindo referência de 5V
      voltage = raw / 4096. * 5;

      // Calcula resistência do LDR pelo divisor resistivo
      resistance = 2000 * voltage / (1 - voltage / 5);

      // Estima lux com base no modelo logarítmico do LDR
      lux = pow(RL10 * 1e3 * pow(10, GAMMA) / resistance, (1 / GAMMA));

      // Limita valores para evitar overflow e instabilidade
      lux = constrain(lux, 0.1, 100000);

      // Usa log10 porque percepção humana de luz é logarítmica
      logLux = log10(lux);

      // Normaliza para 0–100 em uma escala aproximada
      normalizedLux = (logLux + 1) * (100.0 / 6.0);

      // Determina estado (zona de conforto/risco)
      State state = getLightState(normalizedLux);

      // Cria mensagem descritiva baseada no estado
      msg = state == CRITICAL ? "Iluminacao critica! Prejudica leitura e postura." :
            state == POOR     ? "Iluminacao baixa ou alta demais. Ajustar luminarias." :
            state == MODERATE ? "Iluminacao moderada. Pode gerar cansaco visual." :
            state == GOOD     ? "Iluminacao adequada." :
                                "Iluminacao excelente para trabalho.";
    }

    // Retorna a iluminância estimada em lux
    float getValue() override {
      return lux;
    }

    // Retorna o valor normalizado (0–100)
    float getNormal() {
      return normalizedLux;
    }

    // Mensagem de diagnóstico do sensor
    String getMessage() override {
      return msg;
    }

    // Serialização opcional para JSON
    String getJson() override {
      return "{ \"value\": " + String(normalizedLux) +
            ", \"msg\": \"" + msg + "\" }";
    }
};
