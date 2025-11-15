import { Navbar } from "../components/Navbar";

export function Home() {
    return (
        <>            
            <Navbar />
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center py-10 mt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center lg:justify-start">
                            <img src="src\assets\prodsense_logo.png" alt="Hero Image" />
                        </div>
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                                Transforme o Ambiente de Trabalho
                                <span className="text-blue-500 block">em Produtividade Real</span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                                A ProdSense monitora luminosidade, ruído, temperatura e qualidade do ar através de sensores IoT para calcular o Índice de Conforto Produtivo.
                                A IA analisa padrões, identifica riscos ao bem-estar e envia recomendações automáticas para melhorar a performance da equipe.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href="#"
                                    className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Começar Agora
                                </a>
                                <a
                                    href="#"
                                    className="border border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-all duration-200"
                                >
                                    Ver Demonstração
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Tecnologia Inteligente para Ambientes Mais Saudáveis
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Mantenha seu time confortável, produtivo e seguro com análises guiadas por IoT + IA.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-gray-700">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Painel em Tempo Real</h3>
                            <p className="text-gray-400">
                                Acompanhe temperatura, ruído, luminosidade e qualidade do ar com dados enviados
                                diretamente pelos sensores IoT. Tudo atualizado em tempo real no seu dashboard.
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-gray-700">
                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">IA com Recomendação Automática</h3>
                            <p className="text-gray-400">
                                Nossa inteligência artificial identifica padrões ambientais e envia sugestões práticas,
                                como ajustes de temperatura, iluminação e pausas estratégicas para melhorar o conforto
                                e a produtividade.
                            </p>
                        </div>
                        {/* Feature Card 3 */}
                        <div className="bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-gray-700">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Segurança dos Dados</h3>
                            <p className="text-gray-400">
                                Toda coleta e transmissão feita pelo sistema IoT é criptografada, garantindo privacidade
                                e segurança para análises e tomadas de decisão confiáveis.
                            </p>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}