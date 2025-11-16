#include "pci.h"
#include "states.h"

// Valores lidos diretamente dos sensores (vindos de outros módulos).
// O uso de 'extern' indica forte acoplamento entre módulos — funciona,
// mas dificulta testes isolados e manutenção.
extern float tempValue;
extern float humValue;
extern int lightValue;
extern int noiseValue;
extern int airValue;

// Calcula o PCI (Índice de Conforto Produtivo) como a média dos 5 scores.
// Cada variável é convertida para uma pontuação de 0–100 através do stateToScore.
// Estrutura simples, clara e fácil de entender, ainda que trate todos os fatores
// como igualmente importantes — algo que pode ou não representar a realidade.
float getPCI() {
  float sTemp = stateToScore(getTempState(tempValue));
  float sHum  = stateToScore(getHumidityState(humValue));
  float sLux  = stateToScore(getLightState(lightValue));
  float sNoi  = stateToScore(getNoiseState(noiseValue));
  float sAir  = stateToScore(getAirState(airValue));

  // Média simples dos 5 pilares do ambiente.
  return (sTemp + sHum + sLux + sNoi + sAir) / 5.0;
}

// Texto qualitativo baseado na faixa do PCI.
// A escala é linear e compreensível, porém assume que 75 = “bom”
// para qualquer ambiente e contexto — prática, mas não científica.
String getPCIDescription(float pci) {
  if (pci >= 90) return "Ambiente excelente para produtividade.";
  if (pci >= 75) return "Ambiente bom, confortável.";
  if (pci >= 60) return "Ambiente moderado, atenção.";
  if (pci >= 40) return "Ambiente ruim, prejudica foco.";
  return "Ambiente crítico — produtividade muito afetada.";
}

// Recomendações gerais com base na faixa de PCI.
// Mensagens diretas, mas com thresholds arbitrários.
// Funciona bem para um MVP, porém no futuro pode ser refinado por IA
// ou por heurísticas mais específicas (por variável).
String getGeneralRecommendation(float pci) {
  if (pci < 40) return "Ambiente critico! Recomenda-se pausa imediata e ajustes no ambiente.";
  if (pci < 55) return "Ambiente prejudicial. Ajustar luz, temperatura ou ruido.";
  if (pci < 70) return "Ambiente moderado. Pequenos ajustes podem melhorar a produtividade.";
  if (pci < 85) return "Ambiente bom. Apenas monitorar.";
  return "Ambiente excelente. Produtividade ideal.";
}
