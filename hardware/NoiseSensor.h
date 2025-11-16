#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

class NoiseSensor : public SensorBase {
  private:
    int pin;
    int noise;
    String msg;

  public:
    NoiseSensor(int pin) : pin(pin), noise(0) {}

    void processValue() override {
      int raw = analogRead(pin);

      noise = map(raw, 0, 4095, 0, 100);
      State state = getNoiseState(noise);

      msg = state == CRITICAL ? "Ruido muito alto!" :
            state == POOR     ? "Ruido ruim." :
            state == MODERATE ? "Ruido moderado." :
            state == GOOD     ? "Ruido adequado." :
            "Silêncio ideal.";
    }

    float getValue() override {
      return noise;
    }

    String getMessage() override {
      return msg;
    }
    /*
    String getJson() override {
      return "{ \"value\": " + String(noise) +
            ", \"msg\": \"" + msg + "\" }";
    }
    
    */

};