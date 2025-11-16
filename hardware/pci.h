#pragma once
#include <Arduino.h>
#include "states.h"

float getPCI();
String getPCIDescription(float pci);
String getGeneralRecommendation(float pci);