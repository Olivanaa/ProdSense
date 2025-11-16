import { useEffect, useState } from "react";
import NavbarHome from "../components/NavbarHome";
import { fetchDeviceData } from "../utils/DeviceData";
import EnvironmentCard from "../components/EnvironmentCard";
import RecommendationCard from "../components/RecommendationCard";
import DashboardError  from "./DashboardError";

export default function Dashboard() {
    const [dados, setDados] = useState({
        temperatura: null,
        umidade: null,
        luminosidade: null,
        ruido: null,
        qualidadeAr: null,
        pci: null,
    });
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    async function carregarDados() {
        setErro(null);
        try {
            const resultado = await fetchDeviceData();
            if (!resultado) throw new Error("Falha ao buscar dados.");
            setDados({
                temperatura: resultado.temperature,
                umidade: resultado.humidity,
                luminosidade: resultado.luminosity,
                ruido: resultado.noise,
                qualidadeAr: resultado.airQuality,
                pci: resultado.pci,
            });
        } catch (e) {
            console.error(e);
            setErro("Erro ao buscar dados.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        carregarDados();
        const interval = setInterval(carregarDados, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading)
        return (
            <main className="bg-gray-950 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg
                        className="animate-spin h-12 w-12 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <span className="text-white text-xl font-semibold">Carregando...</span>
                </div>
            </main>
        );
    if (erro)
    return <DashboardError
                message={erro}
                onRetry={carregarDados}
            />;

    return (
        <main className="bg-gray-950 min-h-screen lg:pt-30">
            <NavbarHome />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <h1 className="text-4xl font-bold text-white mb-12 text-center">
                    Dashboard de Conforto Produtivo
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <EnvironmentCard title="Temperatura" value={dados.temperatura} unit="°C" type="temperature"/>
                    <EnvironmentCard title="Umidade" value={dados.umidade} unit="%" type="humidity"/>
                    <EnvironmentCard title="Luminosidade" value={dados.luminosidade} type="light"/>
                    <EnvironmentCard title="Ruído" value={dados.ruido} unit="dB" type="noise"/>
                    <EnvironmentCard title="Qualidade do Ar" value={dados.qualidadeAr} type="air"/>
                    <EnvironmentCard title="PCI" value={dados.pci} type="pci"/>
                </div>

                <div className="mt-16 flex justify-center">
                    <RecommendationCard pci={dados.pci}/>
                </div>
            </section>
        </main>
    );
}
