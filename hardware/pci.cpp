#include "pci.h"
#include "states.h"

extern float tempValue;
extern float humValue;
extern int lightValue;
extern int noiseValue;
extern int airValue;

float getPCI() {
  float sTemp = stateToScore(getTempState(tempValue));
  float sHum  = stateToScore(getHumidityState(humValue));
  float sLux  = stateToScore(getLightState(lightValue));
  float sNoi  = stateToScore(getNoiseState(noiseValue));
  float sAir  = stateToScore(getAirState(airValue));

  return (sTemp + sHum + sLux + sNoi + sAir) / 5.0;
}

String getPCIDescription(float pci) {
  if (pci >= 90) return "Ambiente excelente para produtividade.";
  if (pci >= 75) return "Ambiente bom, confortável.";
  if (pci >= 60) return "Ambiente moderado, atenção.";
  if (pci >= 40) return "Ambiente ruim, prejudica foco.";
  return "Ambiente crítico — produtividade muito afetada.";
}

String getGeneralRecommendation(float pci) {
  if (pci < 40) return "Ambiente critico! Recomenda-se pausa imediata e ajustes no ambiente.";
  if (pci < 55) return "Ambiente prejudicial. Ajustar luz, temperatura ou ruido.";
  if (pci < 70) return "Ambiente moderado. Pequenos ajustes podem melhorar a produtividade.";
  if (pci < 85) return "Ambiente bom. Apenas monitorar.";
  return "Ambiente excelente. Produtividade ideal.";
}