import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
            <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative mb-8">
                        <h1 className="text-9xl lg:text-[12rem] font-bold text-gray-800 opacity-50">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-6xl lg:text-8xl font-bold text-white">
                                404
                            </h2>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                            Página Não Encontrada
                        </h3>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Ops! A página que você está procurando não existe ou foi movida.
                            Vamos te ajudar a encontrar o caminho certo.
                        </p>
                    </div>

                    <div className="flex justify-center mb-12">
                        <div className="relative">
                            <div className="w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-16 h-16 text-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link to="/">
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Voltar para Home</span>
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-all duration-200 flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Ir para Dashboard</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}