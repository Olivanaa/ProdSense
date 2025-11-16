import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { fetchDeviceData } from "../utils/DeviceData";
import EnvironmentCard from "../components/EnvironmentCard";
import NavBar from "../components/Navbar";

export default function AdminDashboard() {
    const [dados, setDados] = useState({
        temperatura: null,
        umidade: null,
        luminosidade: null,
        ruido: null,
        qualidadeAr: null,
        pci: null,
    });
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    async function carregarDados() {
        setErro(null);
        try {
            const resultado = await fetchDeviceData();
            if (!resultado) throw new Error("Falha ao buscar dados.");

            const novosDados = {
                temperatura: resultado.temperature,
                umidade: resultado.humidity,
                luminosidade: resultado.luminosity,
                ruido: resultado.noise,
                qualidadeAr: resultado.airQuality,
                pci: resultado.pci,
            };

            setDados(novosDados);

            const timestamp = new Date().toLocaleTimeString();
            setHistorico(prev => [
                ...prev.slice(-23),
                {
                    timestamp,
                    temperatura: novosDados.temperatura,
                    umidade: novosDados.umidade,
                    luminosidade: novosDados.luminosidade,
                    ruido: novosDados.ruido,
                    qualidadeAr: novosDados.qualidadeAr,
                    pci: novosDados.pci,
                }
            ]);
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
        const interval = setInterval(carregarDados, 30000);
        return () => clearInterval(interval);
    }, []);

    const dadosGraficoTemperatura = historico.map(item => ({
        hora: item.timestamp,
        temperatura: item.temperatura
    }));

    const dadosGraficoMultiplo = historico.map(item => ({
        hora: item.timestamp,
        temperatura: item.temperatura,
        umidade: item.umidade,
        luminosidade: item.luminosidade,
        ruido: item.ruido,
        qualidadeAr: item.qualidadeAr
    }));

    const dadosGraficoPCI = historico.map(item => ({
        hora: item.timestamp,
        pci: item.pci
    }));

    const statsCards = [
        {
            title: "PCI Médio",
            value: historico.length > 0
                ? (historico.reduce((acc, curr) => acc + curr.pci, 0) / historico.length).toFixed(1)
                : "0",
            unit: "",
            type: "pci"
        },
        {
            title: "Temperatura Média",
            value: historico.length > 0
                ? (historico.reduce((acc, curr) => acc + curr.temperatura, 0) / historico.length).toFixed(1)
                : "0",
            unit: "°C",
            type: "temperature"
        },
        {
            title: "Umidade Média",
            value: historico.length > 0
                ? (historico.reduce((acc, curr) => acc + curr.umidade, 0) / historico.length).toFixed(1)
                : "0",
            unit: "%",
            type: "humidity"
        }
    ];

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
        return (
            <main className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Erro ao carregar dados</h2>
                    <p className="text-gray-300 mb-4">{erro}</p>
                    <button
                        onClick={carregarDados}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </main>
        );

    return (
        <main className="bg-gray-950 min-h-screen">
            <NavBar />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Dashboard Administrativo
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statsCards.map((card, index) => (
                        <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                            <h3 className="text-gray-400 text-sm font-medium mb-2">{card.title}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">{card.value}</span>
                                <span className="text-gray-400">{card.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-6">Evolução do PCI</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dadosGraficoPCI}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="hora"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    domain={[0, 100]}
                                    fontSize={12}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#F9FAFB'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pci"
                                    stroke="#3B82F6"
                                    fill="#3B82F6"
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-6">Temperatura ao Longo do Tempo</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dadosGraficoTemperatura}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="hora"
                                        stroke="#9CA3AF"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke="#9CA3AF"
                                        fontSize={12}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '8px',
                                            color: '#F9FAFB'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="temperatura"
                                        stroke="#EF4444"
                                        strokeWidth={2}
                                        dot={{ fill: '#EF4444', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-6">Múltiplas Métricas</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dadosGraficoMultiplo}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="hora"
                                        stroke="#9CA3AF"
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke="#9CA3AF"
                                        fontSize={12}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: '1px solid #374151',
                                            borderRadius: '8px',
                                            color: '#F9FAFB'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="temperatura"
                                        stroke="#EF4444"
                                        strokeWidth={2}
                                        name="Temperatura (°C)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="umidade"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        name="Umidade (%)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="ruido"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        name="Ruído (dB)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-6">Métricas Atuais</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { metric: 'Temperatura', value: dados.temperatura, fill: '#EF4444' },
                                { metric: 'Umidade', value: dados.umidade, fill: '#3B82F6' },
                                { metric: 'Luminosidade', value: dados.luminosidade / 100, fill: '#F59E0B' },
                                { metric: 'Ruído', value: dados.ruido, fill: '#10B981' },
                                { metric: 'Qualidade Ar', value: dados.qualidadeAr, fill: '#8B5CF6' },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="metric"
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#F9FAFB'
                                    }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Valores Atuais dos Sensores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <EnvironmentCard title="Temperatura" value={dados.temperatura} unit="°C" type="temperature" />
                        <EnvironmentCard title="Umidade" value={dados.umidade} unit="%" type="humidity" />
                        <EnvironmentCard title="Luminosidade" value={dados.luminosidade} unit="lux" type="light" />
                        <EnvironmentCard title="Ruído" value={dados.ruido} unit="dB" type="noise" />
                        <EnvironmentCard title="Qualidade do Ar" value={dados.qualidadeAr} type="air" />
                        <EnvironmentCard title="PCI" value={dados.pci} type="pci" />
                    </div>
                </div>
            </section>
        </main>
    );
}