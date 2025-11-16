#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

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
    int pin;
    float voltage, resistance, lux, logLux, normalizedLux;
    String msg;
    const float GAMMA = 0.7;
    const float RL10 = 50.0;

  public:
    LightSensor(int pin) : pin(pin), lux(0) {}

    void processValue() override {
      int raw = analogRead(pin);

      voltage = raw / 4096. * 5;
      resistance = 2000 * voltage / (1 - voltage / 5);
      lux = pow(RL10 * 1e3 * pow(10, GAMMA) / resistance, (1 / GAMMA));
      lux = constrain(lux, 0.1, 100000);
      logLux = log10(lux);
      normalizedLux = (logLux + 1) * (100.0 / 6.0);

      State state = getLightState(normalizedLux);

      msg = state == CRITICAL ? "Iluminacao critica! Prejudica leitura e postura." :
            state == POOR     ? "Iluminacao baixa ou alta demais. Ajustar luminarias." :
            state == MODERATE ? "Iluminacao moderada. Pode gerar cansaco visual." :
            state == GOOD     ? "Iluminacao adequada." :
            "Iluminacao excelente para trabalho.";
    }

    float getValue() override {
      return lux;
    }

    float getNormal() {
      return normalizedLux;
    }

    String getMessage() override {
      return msg;
    }

};

