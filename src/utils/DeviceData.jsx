const FIWARE_SVC = "smart";
const FIWARE_SSP = "/";
const ENTITY_ID = "urn:ngsi-ld:device111";

export async function fetchDeviceData() {
  try {
    const headers = {
      "fiware-service": FIWARE_SVC,
      "fiware-servicepath": FIWARE_SSP,
      Accept: "application/json",
    };

    const res = await fetch(`/orion/v2/entities/${ENTITY_ID}`, { headers });
    const json = await res.json();

    return {
      luminosity: json.luminosity?.value ?? null,
      temperature: json.temperature?.value ?? null,
      humidity: json.humidity?.value ?? null,
      noise: json.noise?.value ?? null,
      airQuality: json.airquality?.value ?? null,
      pci: json.pci?.value ?? null,
    };
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return null;
  }
}
