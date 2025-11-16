#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"

class AirSensor : public SensorBase {
  private:
    int pin;
    int air;
    String msg;

  public:
    AirSensor(int pin) : pin(pin), air(0) {}

    void processValue() override {
      int raw = analogRead(pin);

      air = map(raw, 0, 4095, 0, 100);
      State state = getAirState(air);

      msg = state == CRITICAL ? "Ar muito ruim!" :
            state == POOR     ? "Qualidade do ar baixa." :
            state == MODERATE ? "Ar moderado." :
            state == GOOD     ? "Ar bom." :
            "Ar excelente.";
    }

    float getValue() override {
      return air;
    }

    String getMessage() override {
      return msg;
    }

    /*
    
    String getJson() override {
      return "{ \"value\": " + String(air) +
            ", \"msg\": \"" + msg + "\" }";
    }
    */

};