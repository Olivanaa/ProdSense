#ifndef WIFI_H
#define WIFI_H

#include <WiFi.h>

// SSID e senha da rede Wi-Fi usada para conexão.
// Aqui você está usando a rede padrão do Wokwi.
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// Função responsável por inicializar a conexão Wi-Fi.
void setup_wifi() {
  delay(10); // Pequena espera para estabilização do sistema.

  Serial.println();
  Serial.print("Conectando ao WiFi: ");
  Serial.println(ssid); // Exibe o nome da rede no monitor serial.

  WiFi.begin(ssid, password); // Inicia tentativa de conexão usando SSID e senha.

  // Loop que só sai quando a conexão for estabelecida.
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);  // Espera meio segundo entre as tentativas.
    Serial.print("."); // Feedback visual de que ainda está tentando.
  }

  Serial.println("");
  Serial.println("WiFi conectado!"); // Indica sucesso.
  Serial.print("IP: ");
  Serial.println(WiFi.localIP()); // Exibe o IP obtido pelo ESP32.
}

#endif
