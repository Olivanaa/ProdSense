#pragma once
#include <Arduino.h>

// Enum que representa o estado qualitativo de um sensor
// Usado para padronizar classificações (excelente, bom, etc.)
enum State {
  EXCELLENT,
  GOOD,
  MODERATE,
  POOR,
  CRITICAL
};

// Converte um estado para uma pontuação numérica (ex: EXCELLENT → 100)
// Usado para calcular o PCI posteriormente
int stateToScore(State state);

// Converte uma pontuação de volta para um estado (ex: 72 → GOOD)
State scoreToState(int score);

// Retorna o nome textual de um estado (ex: "Excelente", "Moderado")
String getStateName(State state);

// Avaliação do estado baseado nos valores dos sensores
// Cada função recebe o valor bruto e retorna um State correspondente

// Classifica nível de luz ambiente
State getLightState(float normalizedLux);

// Classifica temperatura
State getTempState(float temperature);

// Classifica umidade do ar
State getHumidityState(float humidity);

// Classifica nível de ruído
State getNoiseState(int noiseLevel);

// Classifica qualidade do ar / gás
State getAirState(int gasQuality);
