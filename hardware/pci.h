#pragma once
#include <Arduino.h>
#include "states.h"

// Declara a função que calcula o PCI (Índice de Conforto Produtivo).
// É apenas a interface — a implementação real está no pci.cpp.
// Mantém o código organizado e permite reutilização em todo o projeto.
float getPCI();

// Retorna uma descrição qualitativa baseada no valor numérico do PCI.
// Fornece contexto para o usuário entender o que o índice significa
// sem precisar interpretar números.
String getPCIDescription(float pci);

// Gera uma recomendação prática de acordo com o PCI.
// Essa função abstrai a lógica de decisão e centraliza a mensagem,
// mantendo o loop principal mais limpo.
String getGeneralRecommendation(float pci);
