import { NavbarHome } from "../components/NavbarHome";
import { Activity, Brain, Cpu, Cloud, Gauge, Users, Sparkles, Wind } from "lucide-react";
import Card from "../components/Card";
import simulation_wokwi from "../assets/simulation_wokwi.png"

export default function About() {

    const sensorsList = [
        { title: "Temperatura", icon: Gauge },
        { title: "Umidade", icon: Cloud },
        { title: "Ruído", icon: Activity },
        { title: "Luminosidade", icon: Sparkles },
        { title: "Qualidade do Ar", icon: Wind },
    ];

    const architectureList = [
        { title: "Camada IoT", icon: Cpu, text: "ESP32 coleta dados dos sensores e envia para a API.", colorClass: "text-blue-400" },
        { title: "Processamento", icon: Cloud, text: "API Flask armazena no Postgres e trata os dados brutos.", colorClass: "text-green-400" },
        { title: "IA e ICP", icon: Brain, text: "Algoritmos calculam o ICP e geram recomendações inteligentes.", colorClass: "text-purple-400" },
        { title: "Exibição", icon: Users, text: "Dashboard com gráficos, histórico e insights.", colorClass: "text-yellow-400" },
    ];

    return (
        <main className="bg-gray-950 min-h-screen pb-30 md:py-30">
            <NavbarHome />

            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 text-center">
                <h1 className="text-4xl lg:text-5xl font-bold text-white">
                    Sobre o ProdSense
                </h1>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Uma solução IoT + IA desenvolvida para criar ambientes de trabalho
                    mais saudáveis, inteligentes e produtivos. Monitoramento ambiental
                    avançado aliado ao Índice de Conforto Produtivo (ICP).
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Introdução</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Ambientes de trabalho mal climatizados, barulhentos ou
                        mal-iluminados comprometem foco, criatividade, motivação e
                        desempenho. O ProdSense surge como resposta a esse desafio,
                        oferecendo um monitoramento contínuo e inteligente para tomar
                        decisões baseadas em dados reais — não em achismos.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        O projeto segue as diretrizes dos Objetivos de Desenvolvimento
                        Sustentável:
                    </p>
                    <ul className="text-gray-300 space-y-3">
                        <li>• ODS 3: Saúde e Bem-Estar</li>
                        <li>• ODS 8: Trabalho Decente e Crescimento Econômico</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <img 
                        src={simulation_wokwi} 
                        alt="Simulação Wokwi do Protótipo IoT"
                        className="w-full rounded-2xl shadow-lg border border-gray-800"
                    />
                    <p className="text-gray-400 text-center mt-4">
                        <span className="font-semibold text-gray-300">Simulação Wokwi</span><br />
                        <span className="text-sm">Protótipo IoT do ProdSense</span>
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-28">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Oportunidade Identificada
                </h2>

                <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto leading-relaxed">
                    Empresas ainda reagem lentamente aos problemas ambientais no
                    ambiente de trabalho. Muitas só ajustam temperatura, iluminação
                    ou ruído após receber reclamações — quando o desempenho já foi
                    prejudicado. Surge então a necessidade de um sistema preventivo
                    e inteligente que antecipe riscos.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Solução Proposta</h2>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        O ProdSense integra sensores IoT com uma camada de inteligência
                        artificial capaz de calcular e interpretar o Índice de Conforto
                        Produtivo (ICP). Assim, gestores acompanham o ambiente em tempo
                        real e recebem recomendações automáticas para corrigir fatores que
                        prejudiquem o bem-estar.
                    </p>

                    <h3 className="text-xl font-semibold text-white">Sensores utilizados:</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>• Temperatura</li>
                        <li>• Umidade</li>
                        <li>• Luminosidade</li>
                        <li>• Níveis de ruído</li>
                        <li>• Qualidade do ar (MQ-135)</li>
                    </ul>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-6">
                    {sensorsList.map((item, idx) => (
                        <Card
                            key={idx}
                            icon={item.icon}
                            title={item.title}
                            size="default"     
                        />
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-32">
                <h2 className="text-3xl font-bold text-white text-center mb-14">
                    Arquitetura da Solução
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {architectureList.map((item, idx) => (
                        <Card
                            key={idx}
                            icon={item.icon}
                            title={item.title}
                            text={item.text}
                            colorClass={item.colorClass}
                            size="large"        
                        />
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-32">
                <h2 className="text-3xl font-bold text-white mb-10 text-center">
                    Índice de Conforto Produtivo (ICP)
                </h2>

                <p className="text-gray-300 text-lg max-w-4xl mx-auto text-center leading-relaxed">
                    O ICP consolida temperatura, umidade, ruído, luz e qualidade do ar
                    em uma única métrica. Ele classifica o ambiente em:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

                    <div className="bg-green-600/20 border border-green-500 rounded-2xl p-6 text-center">
                        <h3 className="text-xl text-white font-bold">ICP Alto</h3>
                        <p className="text-gray-300 mt-3">
                            Ambiente ideal e altamente produtivo.
                        </p>
                    </div>

                    <div className="bg-yellow-600/20 border border-yellow-500 rounded-2xl p-6 text-center">
                        <h3 className="text-xl text-white font-bold">ICP Moderado</h3>
                        <p className="text-gray-300 mt-3">
                            Ambiente aceitável, mas com margem de melhoria.
                        </p>
                    </div>

                    <div className="bg-red-600/20 border border-red-500 rounded-2xl p-6 text-center">
                        <h3 className="text-xl text-white font-bold">ICP Crítico</h3>
                        <p className="text-gray-300 mt-3">
                            Exige ações imediatas.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
