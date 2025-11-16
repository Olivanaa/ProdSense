#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

// Converte valor de luminosidade (lux) em uma pontuação de 0 a 100
// A curva é dividida em faixas mapeadas com "map" para representar conforto visual
int luxToScore(float lux) {
  if (lux < 20) return 0;                                   // Muito escuro
  if (lux < 100) return map(lux, 20, 100, 10, 40);          // Baixa luz
  if (lux < 200) return map(lux, 100, 200, 40, 60);         // Luz moderada
  if (lux < 350) return map(lux, 200, 350, 60, 80);         // Ideal
  if (lux < 650) return map(lux, 350, 650, 80, 100);        // Excelente
  if (lux < 800) return map(lux, 650, 800, 100, 60);        // Começa a ficar forte demais
  if (lux < 1200) return map(lux, 800, 1200, 60, 40);       // Excesso de luz
  if (lux < 5000) return map(lux, 1200, 5000, 40, 10);      // Muito forte
  return 0;                                                 // Extremamente forte
}

// Classe que representa um sensor de luminosidade
class LightSensor : public SensorBase {
  private:
    int pin;                    // Pino analógico do sensor
    float voltage, resistance;  // Intermediários usados no cálculo
    float lux, logLux;          // Lux calculado e log10(lux)
    float normalizedLux;        // Lux normalizado de 0 a 100
    String msg;                 // Mensagem final gerada com base no estado

    // Constantes utilizadas no cálculo do lux via fotocélula/LDR
    const float GAMMA = 0.7;
    const float RL10 = 50.0;

  public:
    // Construtor: recebe o pino e inicializa o lux como 0
    LightSensor(int pin) : pin(pin), lux(0) {}

    // Lê, processa e interpreta o valor do sensor de luz
    void processValue() override {
      int raw = analogRead(pin);  // Leitura ADC

      // Converte ADC para tensão
      voltage = raw / 4096. * 5;

      // Converte tensão em resistência (modelo do LDR)
      resistance = 2000 * voltage / (1 - voltage / 5);

      // Calcula lux usando modelo logarítmico do LDR
      lux = pow(RL10 * 1e3 * pow(10, GAMMA) / resistance, (1 / GAMMA));

      // Limita valores absurdos para estabilidade
      lux = constrain(lux, 0.1, 100000);

      // Converte para log10 para compressão da escala
      logLux = log10(lux);

      // Normaliza lux para faixa 0–100
      normalizedLux = (logLux + 1) * (100.0 / 6.0);

      // Classifica o estado com base no lux normalizado
      State state = getLightState(normalizedLux);

      // Mensagem de recomendação conforme o estado
      msg = state == CRITICAL ? "Iluminacao critica! Prejudica leitura e postura." :
            state == POOR     ? "Iluminacao baixa ou alta demais. Ajustar luminarias." :
            state == MODERATE ? "Iluminacao moderada. Pode gerar cansaco visual." :
            state == GOOD     ? "Iluminacao adequada." :
            "Iluminacao excelente para trabalho.";
    }

    // Retorna o valor de lux bruto calculado
    float getValue() override {
      return lux;
    }

    // Retorna o lux já normalizado (0 a 100)
    float getNormal() {
      return normalizedLux;
    }

    // Retorna a mensagem recomendada
    String getMessage() override {
      return msg;
    }
};
