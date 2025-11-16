#pragma once
#include <Arduino.h>
#include "SensorBase.h"
#include "states.h"
#include <DHT.h>

class HumiditySensor : public SensorBase {
  private:
    DHT* dht;
    float humidity;
    String msg;

  public:
    HumiditySensor(DHT* d) : dht(d), humidity(0) {}

    void processValue() override {
      float h = dht->readHumidity();
      if (isnan(h)) {
        Serial.println("Erro no DHT22 (umidade)");
        return;
      }

      humidity = h;

      State st = getHumidityState(humidity);

      msg =
        st == CRITICAL ? "Umidade perigosa. Usar umidificador." :
        st == POOR     ? "Umidade fora da zona de conforto." :
        st == MODERATE ? "Umidade moderada." :
        st == GOOD     ? "Umidade adequada." :
                         "Umidade ideal.";
    }

    float getValue() override { return humidity; }
    String getMessage() override { return msg; }
    /*
    
    String getJson() override {
      return "{ \"value\": " + String(humidity) +
            ", \"msg\": \"" + msg + "\" }";
    }
    */
};
