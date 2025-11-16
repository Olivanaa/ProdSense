#include "states.h"

// Converte um estado qualitativo para uma pontuação numérica.
// Serve como base para o cálculo do PCI, onde cada sensor contribui
// com um peso proporcional ao seu nível de conforto.
int stateToScore(State state) {
  switch (state) {
    case EXCELLENT: return 100;
    case GOOD:      return 80;
    case MODERATE:  return 60;
    case POOR:      return 40;
    case CRITICAL:  return 20;
  }
  return 0; // fallback de segurança
}

// Faz o caminho inverso: dado um score, retorna o estado qualitativo.
// Útil para interpretar valores calculados como o PCI.
State scoreToState(int score) {
  if (score >= 90) return EXCELLENT;
  if (score >= 70) return GOOD;
  if (score >= 50) return MODERATE;
  if (score >= 30) return POOR;
  return CRITICAL;
}

// Retorna o nome textual do estado.
// Usado em logs, debugging ou exibição ao usuário.
String getStateName(State state) {
  switch (state) {
    case EXCELLENT: return "EXCELLENT";
    case GOOD:      return "GOOD";
    case MODERATE:  return "MODERATE";
    case POOR:      return "POOR";
    case CRITICAL:  return "CRITICAL";
  }
  return "UNKNOWN";
}

// Classifica a iluminação já normalizada (0–100).
// A normalização é feita no sensor, aqui apenas traduz para um estado.
State getLightState(float normalizedLux) {
  if (normalizedLux >= 70) return EXCELLENT;
  if (normalizedLux >= 50) return GOOD;
  if (normalizedLux >= 30) return MODERATE;
  if (normalizedLux >= 10) return POOR;
  return CRITICAL;
}

// Classificação de temperatura com base em faixas ideais.
// Os limites são construídos para refletir conforto térmico em escritórios.
State getTempState(float temperature) {
  if (temperature >= 22 && temperature <= 24) return EXCELLENT;
  if ((temperature >= 20 && temperature < 22) || (temperature > 24 && temperature <= 26)) return GOOD;
  if ((temperature >= 18 && temperature < 20) || (temperature > 26 && temperature <= 28)) return MODERATE;
  if ((temperature >= 16 && temperature < 18) || (temperature > 28 && temperature <= 30)) return POOR;
  return CRITICAL;
}

// Classificação de umidade com base em faixas confortáveis.
// Considera efeitos respiratórios e de sensação térmica.
State getHumidityState(float humidity) {
  if (humidity >= 45 && humidity <= 55) return EXCELLENT;
  if ((humidity >= 40 && humidity < 45) || (humidity > 55 && humidity <= 60)) return GOOD;
  if ((humidity >= 30 && humidity < 40) || (humidity > 60 && humidity <= 70)) return MODERATE;
  if ((humidity >= 20 && humidity < 30) || (humidity > 70 && humidity <= 80)) return POOR;
  return CRITICAL;
}

// Classificação de ruído com base em limites de dB.
// Considera impacto cognitivo e desconforto auditivo.
State getNoiseState(int noiseLevel) {
  if (noiseLevel <= 20) return EXCELLENT;
  if (noiseLevel <= 40) return GOOD;
  if (noiseLevel <= 60) return MODERATE;
  if (noiseLevel <= 80) return POOR;
  return CRITICAL;
}

// Classificação da qualidade do ar medida pelo MQ-135.
// Valores altos representam maior concentração de gases nocivos.
State getAirState(int gasQuality) {
  if (gasQuality <= 10) return EXCELLENT;
  if (gasQuality <= 25) return GOOD;
  if (gasQuality <= 50) return MODERATE;
  if (gasQuality <= 75) return POOR;
  return CRITICAL;
}
