#pragma once
#include <Arduino.h>

// Classe base abstrata para todos os sensores do sistema.
// Define a interface mínima que cada sensor deve implementar,
// garantindo consistência no comportamento de leitura e mensagem.
class SensorBase {
  public:
    // Lê o sensor, processa o valor bruto e atualiza estado/mensagem.
    // Cada sensor implementa sua própria lógica interna.
    virtual void processValue() = 0;

    // Retorna o valor numérico final do sensor já processado.
    // Facilita o envio para o MQTT ou cálculo do PCI.
    virtual float getValue() = 0;

    // Retorna uma mensagem textual interpretando o estado do sensor.
    // Usado para feedback ao usuário e logs.
    virtual String getMessage() = 0;
};
