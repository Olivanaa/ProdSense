#pragma once
#include <Arduino.h>

class SensorBase {
  public:
    virtual void processValue() = 0;
    virtual float getValue() = 0;
    virtual String getMessage() = 0;
};
