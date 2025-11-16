#include <WiFi.h>
#include <DHT.h>
#include <DHT_U.h>
#include <LiquidCrystal_I2C.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#include "states.h"
#include "pci.h"
#include "mqtt.h"
#include "wifi.h"

#include "LightSensor.h"
#include "TemperatureSensor.h"
#include "HumiditySensor.h"
#include "NoiseSensor.h"
#include "AirSensor.h"

#define col 16
#define lin 2
#define ende 0x27
LiquidCrystal_I2C lcd(ende, col, lin);

void displayTwoLinesLCD(String line1, String line2) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(line1);
  lcd.setCursor(0, 1);
  lcd.print(line2);
}

#define LDRPIN 32
LightSensor lightSensor(LDRPIN);

#define DHTPIN 4
DHT dht(DHTPIN, DHT22);

TemperatureSensor tempSensor(&dht);
HumiditySensor humSensor(&dht);

#define NOISE_PIN 34
NoiseSensor noiseSensor(NOISE_PIN);

#define AIR_PIN 35
AirSensor airSensor(AIR_PIN);

float pci;

float tempValue;
float humValue;
int lightValue;
int noiseValue;
int airValue;

WiFiClient espClient;

void setup() {
  Serial.begin(9600);

  setup_wifi();
  initMQTT(espClient);

  pinMode(LDRPIN, INPUT);
  pinMode(NOISE_PIN, INPUT);
  pinMode(AIR_PIN, INPUT);

  dht.begin();
  lcd.init();
  lcd.backlight();
  lcd.clear();

  Serial.println("ProdSense Iniciando...");
  displayTwoLinesLCD("ProdSense", "Produtividade!");
}

void loop() {
  checkConnection();

  lightSensor.processValue();
  lightValue = lightSensor.getValue();
  float luxN = lightSensor.getNormal();

  tempSensor.processValue();
  tempValue = tempSensor.getValue();

  humSensor.processValue();
  humValue = humSensor.getValue();

  noiseSensor.processValue();
  noiseValue = noiseSensor.getValue();

  airSensor.processValue();
  airValue = airSensor.getValue();

  pci = getPCI();
  State globalState = scoreToState(pci);
  String description = getPCIDescription(pci);
  String recommendation = getGeneralRecommendation(pci);

  Serial.println("=====================================");
  Serial.println("        PROD SENSE - LEITURAS        ");
  Serial.println("=====================================");

  Serial.print("Luminosidade: ");
  Serial.println(lightValue);
  Serial.print("Luminosidade (lux normalizado): ");
  Serial.println(luxN);
  Serial.print("Mensagem Luz: ");
  Serial.println(lightSensor.getMessage());
  Serial.println("-------------------------------------");

  Serial.print("Temperatura (°C): ");
  Serial.println(tempValue);
  Serial.print("Mensagem Temp: ");
  Serial.println(tempSensor.getMessage());
  Serial.println("-------------------------------------");

  Serial.print("Umidade (%): ");
  Serial.println(humValue);
  Serial.print("Mensagem Umidade: ");
  Serial.println(humSensor.getMessage());
  Serial.println("-------------------------------------");

  Serial.print("Ruído (0–100): ");
  Serial.println(noiseValue);
  Serial.print("Mensagem Ruído: ");
  Serial.println(noiseSensor.getMessage());
  Serial.println("-------------------------------------");

  Serial.print("Qualidade do Ar (0–100): ");
  Serial.println(airValue);
  Serial.print("Mensagem Ar: ");
  Serial.println(airSensor.getMessage());
  Serial.println("-------------------------------------");

  Serial.println("=========== PCI ===========");
  Serial.print("PCI Score: ");
  Serial.println(pci);

  Serial.print("Estado Global: ");
  Serial.println(
    globalState == EXCELLENT ? "EXCELLENT" :
    globalState == GOOD      ? "GOOD" :
    globalState == MODERATE  ? "MODERATE" :
    globalState == POOR      ? "POOR" :
                               "CRITICAL"
  );

  Serial.print("Descrição: ");
  Serial.println(description);

  Serial.print("Recomendação: ");
  Serial.println(recommendation);

  Serial.println("=====================================\n");

  sendData(lightValue, tempValue, humValue, noiseValue, airValue, pci);

   delay(1000);
}