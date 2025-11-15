import { useEffect, useState } from "react";

const FIWARE_SVC = "smart";
const FIWARE_SSP = "/";
const ENTITY_ID = "urn:ngsi-ld:device111";
const TEMP = "temperature";
const UMID = "humidity";
const LUMI = "luminosity";
const RUIDO = "noise";
const AR = "airquality";
const PCI = "pci";


export function Dashboard() {

    const [dados, setDados] = useState({
        temperatura: null,
        umidade: null,
        luminosidade: null,
        ruido: null,
        qualidadeAr: null,
        pci: null,
    })
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState(null)
    
    async function fetchData() {
        try{
             const headers = {
                "fiware-service": FIWARE_SVC,
                "fiware-servicepath": FIWARE_SSP,
                Accept: "application/json",
            }
            const options = { method: "GET", headers }
            const [tempRes, umidRes, lumiRes, ruidoRes, arRes, pciRes] = await Promise.all([
                fetch(`/orion/v2/entities/${ENTITY_ID}/attrs/${TEMP}`, options),
                fetch(`/orion/v2/entities/${ENTITY_ID}/attrs/${UMID}`, options),
                fetch(`/orion/v2/entities/${ENTITY_ID}/attrs/${LUMI}`, options),    
                fetch(`/orion/v2/entities/${ENTITY_ID}/attrs/${RUIDO}`, options),    
                fetch(`/orion/v2/entities/${ENTITY_ID}/attrs/${AR}`, options),    
                fetch(`/orion/v2/entities/${ENTITY_ID}/attrs/${PCI}`, options),    
            ])

            if (!tempRes.ok || !umidRes.ok || !lumiRes.ok || !ruidoRes.ok || !arRes.ok || !pciRes.ok) {
                throw new Error("Erro ao buscar dados do Orion.");
            }

            const[ tempData, umidData, lumiData, ruidoData, arData, pciData ] = await Promise.all([
                tempRes.json(),
                umidRes.json(),
                lumiRes.json(),
                ruidoRes.json(),
                arRes.json(),
                pciRes.json(),
            ])
            setDados({
                temperatura: tempData.value,
                umidade: umidData.value,
                luminosidade: lumiData.value,
                ruido: ruidoData.value,
                qualidadeAr: arData.value,
                pci: pciData.value,
            })

         }catch (error) {
            console.error("Erro Orion:", error);
            setErro("Erro ao conectar ao Orion.")
        }
    }

    useEffect(() => {
        async function carregar() {
            await fetchData()
            setLoading(false)
        }
        carregar()
        const interval = setInterval(fetchData, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
        </>
    )    
}