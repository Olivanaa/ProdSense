#pragma once
#include <Arduino.h>

enum State {
  EXCELLENT,
  GOOD,
  MODERATE,
  POOR,
  CRITICAL
};

int stateToScore(State state);
State scoreToState(int score);
String getStateName(State state);

State getLightState(float normalizedLux);
State getTempState(float temperature);
State getHumidityState(float humidity);
State getNoiseState(int noiseLevel);
State getAirState(int gasQuality);
